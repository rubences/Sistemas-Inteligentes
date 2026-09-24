import unittest,tempfile,threading,json,urllib.request,urllib.error
from pathlib import Path
try: from app import create_server
except ImportError: create_server=None

class ClassroomTests(unittest.TestCase):
 def setUp(self):
  self.assertIsNotNone(create_server,'Class service is not implemented')
  self.tmp=tempfile.TemporaryDirectory();self.key='test-only-teacher-key-32-characters';self.private=Path(self.tmp.name)/'private';self.private.mkdir();(self.private/'exam.md').write_text('Private marking guide')
  self.server=create_server('127.0.0.1',0,Path(self.tmp.name)/'class.db',self.key,{'https://campus.example'},self.private)
  self.thread=threading.Thread(target=self.server.serve_forever,daemon=True);self.thread.start();self.base='http://127.0.0.1:'+str(self.server.server_address[1])
 def tearDown(self):
  if hasattr(self,'server'):self.server.shutdown();self.server.server_close();self.tmp.cleanup()
 def call(self,path,data=None,token=None,origin='https://campus.example'):
  headers={'Origin':origin}
  if data is not None:headers['Content-Type']='application/json'
  if token:headers['Authorization']='Bearer '+token
  r=urllib.request.Request(self.base+'/api'+path,data=json.dumps(data).encode() if data is not None else None,headers=headers)
  try:
   with urllib.request.urlopen(r) as res:return res.status,json.load(res)
  except urllib.error.HTTPError as e:return e.code,json.load(e)
 def room(self):return self.call('/rooms',{'title':'Test class'},self.key)[1]
 def join(self,r,name='learner'):return self.call('/join',{'code':r['code'],'pseudonym':name})[1]
 def test_authentication_origin_and_room_isolation(self):
  self.assertEqual(self.call('/rooms')[0],401)
  self.assertEqual(self.call('/rooms',token=self.key,origin='https://evil.example')[0],403)
  a,b=self.room(),self.room();student=self.join(a)
  self.assertEqual(self.call('/rooms/'+a['id'],token=student['token'])[0],200)
  self.assertEqual(self.call('/rooms/'+b['id'],token=student['token'])[0],401)
  self.assertEqual(self.call('/rooms/'+a['id']+'/records',token=student['token'])[0],401)
  self.assertEqual(self.call('/solutions',token=student['token'])[0],401)
  self.assertEqual(self.call('/solutions',token=self.key)[1]['files'][0]['text'],'Private marking guide')
 def test_poll_vote_update_close_and_counts(self):
  r=self.room();s=self.join(r);path='/rooms/'+r['id'];poll=self.call(path+'/poll',{'question':'Which method?','options':['BFS','UCS']},self.key)[1]
  for choice in (0,1):self.assertEqual(self.call(path+'/vote',{'poll':poll['id'],'choice':choice},s['token'])[0],200)
  summary=self.call(path+'/records',token=self.key)[1];self.assertEqual(summary['poll']['counts'],[0,1])
  self.call(path+'/close-poll',{'poll':poll['id']},self.key)
  self.assertEqual(self.call(path+'/vote',{'poll':poll['id'],'choice':0},s['token'])[0],409)
 def test_submissions_receipts_feedback_and_persistence(self):
  r=self.room();s=self.join(r);path='/rooms/'+r['id'];body={'text':'Prediction and evidence','request_id':'unique-receipt-001'}
  first=self.call(path+'/submit',body,s['token'])[1];second=self.call(path+'/submit',body,s['token'])[1];self.assertEqual(first['receipt'],second['receipt'])
  rows=self.call(path+'/records',token=self.key)[1]['submissions'];self.assertEqual(len(rows),1)
  self.call(path+'/feedback',{'receipt':first['receipt'],'text':'Explain the cutoff.'},self.key)
  self.assertEqual(self.call(path,token=s['token'])[1]['submissions'][0]['feedback'],'Explain the cutoff.')
  other=self.join(r,'other');self.assertEqual(self.call(path,token=other['token'])[1]['submissions'],[])
  self.assertTrue((Path(self.tmp.name)/'class.db').stat().st_size>0)
  self.server.shutdown();self.server.server_close()
  self.server=create_server('127.0.0.1',0,Path(self.tmp.name)/'class.db',self.key,{'https://campus.example'},self.private)
  self.thread=threading.Thread(target=self.server.serve_forever,daemon=True);self.thread.start();self.base='http://127.0.0.1:'+str(self.server.server_address[1])
  restored=self.call(path,token=s['token'])[1]['submissions'];self.assertEqual(restored[0]['receipt'],first['receipt']);self.assertEqual(restored[0]['feedback'],'Explain the cutoff.')
 def test_archived_rooms_close_writes_but_retain_records(self):
  r=self.room();s=self.join(r);path='/rooms/'+r['id'];self.call(path+'/archive',{},self.key)
  self.assertEqual(self.call('/join',{'code':r['code'],'pseudonym':'late'})[0],404)
  self.assertEqual(self.call(path+'/submit',{'text':'Evidence','request_id':'archived-001'},s['token'])[0],409)
  self.assertEqual(self.call(path+'/records',token=self.key)[0],200)
 def test_known_participants_do_not_share_rate_limit_behind_nat(self):
  r=self.room();a=self.join(r,'a');b=self.join(r,'b');path='/rooms/'+r['id']
  for _ in range(152):
   self.assertEqual(self.call(path,token=a['token'])[0],200);self.assertEqual(self.call(path,token=b['token'])[0],200)
 def test_validation_rejects_empty_work_and_bad_choices(self):
  r=self.room();s=self.join(r);path='/rooms/'+r['id']
  self.assertEqual(self.call(path+'/submit',{'text':'','request_id':'unique-receipt-002'},s['token'])[0],400)
  self.assertEqual(self.call(path+'/poll',{'question':'x','options':['only one']},self.key)[0],400)
  self.assertEqual(self.call(path+'/submit',{'text':'x'*60001,'request_id':'unique-receipt-002'},s['token'])[0],400)

if __name__=='__main__':unittest.main()
