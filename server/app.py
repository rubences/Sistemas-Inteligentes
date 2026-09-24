#!/usr/bin/env python3
"""Optional classroom service. Deploy behind HTTPS; never serve this data directory publicly."""
import hashlib,hmac,json,os,re,secrets,sqlite3,threading,time
from pathlib import Path
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from urllib.parse import urlsplit

class RequestError(Exception):
 def __init__(self,status,message):self.status=status;self.message=message

def require(condition,message,status=400):
 if not condition:raise RequestError(status,message)
def text(value,limit,name):
 require(isinstance(value,str) and 0<len(value.strip())<=limit,f'{name} must contain 1–{limit} characters.');return value.strip()
def digest(value):return hashlib.sha256(value.encode()).hexdigest()

def create_server(host,port,db_path,teacher_key,origins,private_dir=None):
 require(isinstance(teacher_key,str) and len(teacher_key)>=32,'Configure a teacher key of at least 32 characters.')
 db_path=Path(db_path);db_path.parent.mkdir(parents=True,exist_ok=True)
 db=sqlite3.connect(db_path,check_same_thread=False);db.row_factory=sqlite3.Row;os.chmod(db_path,0o600)
 db.executescript('''
 CREATE TABLE IF NOT EXISTS rooms(id TEXT PRIMARY KEY,code TEXT UNIQUE,title TEXT,created REAL,active INTEGER);
 CREATE TABLE IF NOT EXISTS students(id TEXT PRIMARY KEY,room TEXT,alias TEXT,token TEXT UNIQUE,UNIQUE(room,alias));
 CREATE TABLE IF NOT EXISTS polls(id TEXT PRIMARY KEY,room TEXT,question TEXT,options TEXT,open INTEGER,created REAL);
 CREATE TABLE IF NOT EXISTS votes(poll TEXT,student TEXT,choice INTEGER,PRIMARY KEY(poll,student));
 CREATE TABLE IF NOT EXISTS submissions(id TEXT PRIMARY KEY,room TEXT,student TEXT,request_id TEXT,body TEXT,created REAL,feedback TEXT DEFAULT '',UNIQUE(room,student,request_id));
 ''');db.commit();lock=threading.RLock();rates={}
 def rows(sql,args=()):return [dict(x) for x in db.execute(sql,args).fetchall()]
 def one(sql,args=()):return next(iter(rows(sql,args)),None)
 def current_poll(room,counts=False):
  p=one('SELECT * FROM polls WHERE room=? ORDER BY created DESC LIMIT 1',(room,))
  if p:
   p['options']=json.loads(p['options']);p['open']=bool(p['open'])
   if counts or not p['open']:
    p['counts']=[0]*len(p['options'])
    for r in rows('SELECT choice,COUNT(*) AS n FROM votes WHERE poll=? GROUP BY choice',(p['id'],)):p['counts'][r['choice']]=r['n']
  return p
 class Handler(BaseHTTPRequestHandler):
  protocol_version='HTTP/1.1'
  def setup(self):super().setup();self.connection.settimeout(10)
  def log_message(self,*args):pass  # Do not log invite codes, tokens or submitted work.
  def reply(self,status,body):
   data=json.dumps(body,ensure_ascii=False).encode();self.send_response(status)
   if self.headers.get('Origin') in origins:self.send_header('Access-Control-Allow-Origin',self.headers['Origin']);self.send_header('Vary','Origin')
   self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Content-Length',str(len(data)));self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.end_headers();self.wfile.write(data)
  def do_OPTIONS(self):
   if self.headers.get('Origin') not in origins:self.reply(403,{'error':'Origin is not allowed.'});return
   self.send_response(204);self.send_header('Access-Control-Allow-Origin',self.headers['Origin']);self.send_header('Vary','Origin');self.send_header('Access-Control-Allow-Methods','GET, POST, OPTIONS');self.send_header('Access-Control-Allow-Headers','Authorization, Content-Type');self.send_header('Content-Length','0');self.end_headers()
  def do_GET(self):self.dispatch()
  def do_POST(self):self.dispatch()
  def dispatch(self):
   try:
    origin=self.headers.get('Origin');require(not origin or origin in origins,'Origin is not allowed.',403)
    body={}
    if self.command=='POST':
     require(self.headers.get('Content-Type','').split(';')[0]=='application/json','Send application/json.',415)
     try:n=int(self.headers.get('Content-Length','-1'))
     except ValueError:raise RequestError(400,'Invalid body size.')
     require(0<=n<=400000,'Request body exceeds 400 KB.',413)
     try:body=json.loads(self.rfile.read(n))
     except (ValueError,UnicodeDecodeError):raise RequestError(400,'Invalid JSON.')
     require(isinstance(body,dict),'Send a JSON object.')
    with lock,db:
     now=time.time();rate_token=self.headers.get('Authorization','').removeprefix('Bearer ');require(len(rate_token)<=512,'Invalid token.',401)
     known=rate_token and (hmac.compare_digest(rate_token.encode(),teacher_key.encode()) or one('SELECT id FROM students WHERE token=?',(digest(rate_token),)))
     bucket=digest(rate_token) if known else self.client_address[0];history=[t for t in rates.get(bucket,[]) if now-t<60];require(len(history)<300,'Too many requests. Wait a minute.',429);history.append(now);rates[bucket]=history
     if len(rates)>1000:
      for old in list(rates):
       if not rates[old] or now-rates[old][-1]>60:rates.pop(old,None)
     path=urlsplit(self.path).path
     token=self.headers.get('Authorization','').removeprefix('Bearer ')
     teacher=bool(token) and hmac.compare_digest(token.encode(),teacher_key.encode())
     def require_teacher():require(teacher,'Teacher authentication is required.',401)
     if path=='/api/health':require(self.command=='GET','Method not allowed.',405);result={'status':'ok','version':1}
     elif path=='/api/rooms':
      require_teacher()
      if self.command=='GET':result={'rooms':rows('SELECT * FROM rooms ORDER BY created DESC')}
      else:
       require(len(rows('SELECT id FROM rooms WHERE active=1'))<50,'Archive an existing room before creating more.',409)
       result={'id':secrets.token_hex(8),'code':secrets.token_urlsafe(12),'title':text(body.get('title'),120,'Title')}
       db.execute('INSERT INTO rooms VALUES(?,?,?,?,1)',(result['id'],result['code'],result['title'],now))
     elif path=='/api/join':
      require(self.command=='POST','Method not allowed.',405)
      code=text(body.get('code'),100,'Room code');room=one('SELECT * FROM rooms WHERE code=? AND active=1',(code,));require(room and now-room['created']<172800,'The room code is invalid, expired or archived.',404)
      alias=text(body.get('pseudonym'),40,'Pseudonym');require(not one('SELECT id FROM students WHERE room=? AND alias=?',(room['id'],alias)),'This pseudonym is already used. Reuse your saved session or choose another.',409)
      require(len(rows('SELECT id FROM students WHERE room=?',(room['id'],)))<150,'Room participant limit reached.',409)
      token=secrets.token_urlsafe(32);sid=secrets.token_hex(12);db.execute('INSERT INTO students VALUES(?,?,?,?)',(sid,room['id'],alias,digest(token)));result={'room':room['id'],'token':token,'pseudonym':alias}
     elif path=='/api/solutions':
      require_teacher();require(self.command=='GET','Method not allowed.',405);files=[]
      if private_dir:
       private=Path(private_dir).resolve()
       if private.is_dir():
        for p in sorted(private.glob('*.md'))[:20]:
         if p.resolve().is_relative_to(private) and p.stat().st_size<=100000:files.append({'name':p.name,'text':p.read_text(encoding='utf-8')})
      result={'files':files}
     else:
      match=re.fullmatch(r'/api/rooms/([0-9a-f]{16})(?:/([a-z-]+))?',path);require(match,'Endpoint not found.',404);rid,action=match.groups();room=one('SELECT * FROM rooms WHERE id=?',(rid,));require(room,'Room not found.',404)
      student=one('SELECT * FROM students WHERE room=? AND token=?',(rid,digest(token))) if token and not teacher else None
      if action in {'records','poll','close-poll','feedback','archive'}:require_teacher()
      else:require(teacher or student,'A valid room participant token is required.',401)
      if action is None:
       require(self.command=='GET','Method not allowed.',405);result={'id':rid,'title':room['title'],'active':bool(room['active']),'poll':current_poll(rid,teacher),'submissions':rows('SELECT id AS receipt,created,feedback FROM submissions WHERE room=? AND student=? ORDER BY created DESC',(rid,student['id'])) if student else []}
      elif action=='records':
       require(self.command=='GET','Method not allowed.',405);result={'room':room,'participants':len(rows('SELECT id FROM students WHERE room=?',(rid,))),'poll':current_poll(rid,True),'submissions':rows('SELECT s.id AS receipt,t.alias,s.body AS text,s.created,s.feedback FROM submissions s JOIN students t ON t.id=s.student WHERE s.room=? ORDER BY s.created DESC',(rid,))}
      elif action=='poll':
       require(self.command=='POST','Method not allowed.',405);require(room['active'],'Room is archived.',409);question=text(body.get('question'),300,'Question');opts=body.get('options');require(isinstance(opts,list) and 2<=len(opts)<=6,'Use 2–6 options.');opts=[text(o,150,'Option') for o in opts];require(len(set(opts))==len(opts),'Options must be distinct.')
       db.execute('UPDATE polls SET open=0 WHERE room=?',(rid,));pid=secrets.token_hex(12);db.execute('INSERT INTO polls VALUES(?,?,?,?,1,?)',(pid,rid,question,json.dumps(opts),now));result={'id':pid}
      elif action=='close-poll':
       require(self.command=='POST','Method not allowed.',405);p=current_poll(rid);require(p and body.get('poll')==p['id'],'Current poll not found.',404);db.execute('UPDATE polls SET open=0 WHERE id=?',(p['id'],));result={'closed':True}
      elif action=='vote':
       require(self.command=='POST' and student,'A student vote requires POST and a participant token.',401);p=current_poll(rid);require(room['active'] and p and p['open'] and body.get('poll')==p['id'],'This poll is closed or no longer current.',409);choice=body.get('choice');require(type(choice) is int and 0<=choice<len(p['options']),'Invalid choice.')
       db.execute('INSERT INTO votes VALUES(?,?,?) ON CONFLICT(poll,student) DO UPDATE SET choice=excluded.choice',(p['id'],student['id'],choice));result={'recorded':True}
      elif action=='submit':
       require(self.command=='POST' and student,'A submission requires POST and a participant token.',401);require(room['active'],'Room is archived.',409);content=text(body.get('text'),60000,'Evidence');request_id=text(body.get('request_id'),80,'Request id');require(re.fullmatch(r'[A-Za-z0-9_-]{8,80}',request_id),'Invalid request id.')
       existing=one('SELECT id FROM submissions WHERE room=? AND student=? AND request_id=?',(rid,student['id'],request_id))
       if existing:result={'receipt':existing['id'],'duplicate':True}
       else:
        require(len(rows('SELECT id FROM submissions WHERE room=?',(rid,)))<1500,'Room submission limit reached.',409);receipt=secrets.token_hex(12);db.execute('INSERT INTO submissions(id,room,student,request_id,body,created) VALUES(?,?,?,?,?,?)',(receipt,rid,student['id'],request_id,content,now));result={'receipt':receipt,'duplicate':False}
      elif action=='feedback':
       require(self.command=='POST','Method not allowed.',405);receipt=body.get('receipt');require(one('SELECT id FROM submissions WHERE id=? AND room=?',(receipt,rid)),'Receipt not found in this room.',404);feedback=text(body.get('text'),5000,'Feedback');db.execute('UPDATE submissions SET feedback=? WHERE id=?',(feedback,receipt));result={'saved':True}
      elif action=='archive':
       require(self.command=='POST','Method not allowed.',405);db.execute('UPDATE rooms SET active=0 WHERE id=?',(rid,));db.execute('UPDATE polls SET open=0 WHERE room=?',(rid,));result={'archived':True}
      else:raise RequestError(404,'Endpoint not found.')
     db.commit()
    self.reply(200,result)
   except RequestError as e:
    self.reply(e.status,{'error':e.message})
   except (sqlite3.Error,ValueError,TypeError,OSError):
    self.reply(500,{'error':'The request could not be completed. Check the server configuration.'})
 class Server(ThreadingHTTPServer):
  daemon_threads=True
  def server_close(self):super().server_close();db.close()
 return Server((host,port),Handler)

if __name__=='__main__':
 key=os.environ.get('CLASSROOM_TEACHER_KEY','');origins=set(filter(None,os.environ.get('CLASSROOM_ORIGINS','https://rubences.github.io').split(',')))
 if len(key)<32:raise SystemExit('Set CLASSROOM_TEACHER_KEY to a random secret of at least 32 characters. See server/README.md.')
 srv=create_server(os.environ.get('CLASSROOM_HOST','127.0.0.1'),int(os.environ.get('CLASSROOM_PORT','8787')),Path(os.environ.get('CLASSROOM_DB','/tmp/uclm-classroom/class.db')),key,origins,os.environ.get('CLASSROOM_PRIVATE_DIR'))
 print('Classroom service ready. Configure HTTPS before remote classroom use.',flush=True)
 try:srv.serve_forever()
 except KeyboardInterrupt:pass
 finally:srv.server_close()
