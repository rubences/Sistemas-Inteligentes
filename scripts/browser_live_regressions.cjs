/* Regression cases from the independent final review. Run with Playwright/Chromium. */
const {chromium}=require('playwright'),assert=require('node:assert/strict'),{spawn}=require('node:child_process'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const root=path.resolve(__dirname,'..'),base='http://localhost:18795/',service='http://localhost:18797',key='regression-test-teacher-key-32-characters',sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function ready(url){for(let i=0;i<50;i++){try{if((await fetch(url)).ok)return;}catch{}await sleep(100);}throw Error('Server not ready');}
(async()=>{const children=[],tmp=fs.mkdtempSync(path.join(os.tmpdir(),'uclm-regression-'));let browser;const failures=[];
 try{
 children.push(spawn('python3',['-m','http.server','18795'],{cwd:root,stdio:'ignore'}));children.push(spawn('python3',['server/app.py'],{cwd:root,stdio:'ignore',env:{...process.env,CLASSROOM_PORT:'18797',CLASSROOM_ORIGINS:'http://localhost:18795',CLASSROOM_TEACHER_KEY:key,CLASSROOM_DB:path.join(tmp,'class.db')}}));await ready(base);await ready(service+'/api/health');
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{}),...(process.env.CHROMIUM_ARGS?{args:JSON.parse(process.env.CHROMIUM_ARGS).filter(a=>!['--disable-web-security','--allow-running-insecure-content'].includes(a))}:{})});
 const context=await browser.newContext();
 const test=async(name,fn)=>{try{await fn();console.log('PASS:',name);}catch(e){failures.push(name+': '+e.message);console.log('FAIL:',name,e.message);}};
 await test('overlapping connections never send a teacher key to a second service',async()=>{
  const p=await context.newPage(),a='http://localhost:19001',b='http://localhost:19002',sent=[];let release,started;const gate=new Promise(r=>release=r),begun=new Promise(r=>started=r);let first=true;
  await p.route(/http:\/\/localhost:1900[12]\/api\/.*/,async route=>{const req=route.request();sent.push({url:req.url(),authorization:req.headers().authorization});if(req.url()===a+'/api/rooms'&&first){first=false;started();await gate;}const data=req.url().endsWith('/api/join')?{room:'0123456789abcdef',token:'student-token',pseudonym:'race-student'}:req.url().includes('/rooms/')?{title:'Test',active:true,poll:null,submissions:[]}:{rooms:[]};await route.fulfill({status:200,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Authorization, Content-Type'},json:data}).catch(()=>{});});
  await p.goto(base+'#live');await p.locator('#live-url').fill(a);await p.locator('#teacher-connect input').fill(key);await p.locator('#teacher-connect button').click();await begun;
  await p.evaluate(b=>{document.getElementById('live-url').value=b;const form=document.getElementById('join-room');form.elements.code.value='invite';form.elements.alias.value='race-student';form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));},b);await sleep(150);release();await p.locator('#create-room').waitFor();
  assert.equal(sent.some(r=>r.url.startsWith(b)&&r.authorization==='Bearer '+key),false,'teacher key leaked across service origins');await p.close();
 });
 await test('leaving the route invalidates unfinished teacher authentication',async()=>{
  const p=await context.newPage();let release,started,count=0;const gate=new Promise(r=>release=r),begun=new Promise(r=>started=r);
  await p.route('http://localhost:19003/api/rooms',async route=>{count++;if(count===1){started();await gate;}await route.fulfill({status:200,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Authorization, Content-Type'},json:{rooms:[]}}).catch(()=>{});});
  await p.goto(base+'#live');await p.locator('#live-url').fill('http://localhost:19003');await p.locator('#teacher-connect input').fill(key);await p.locator('#teacher-connect button').click();await begun;await p.evaluate(()=>location.hash='home');await p.locator('.unit-card').first().waitFor();await p.evaluate(()=>location.hash='live');await p.locator('#teacher-connect').waitFor();release();await sleep(500);assert.equal(count,1,'stale authentication issued another teacher request');await p.close();
 });
 await test('submission drafts survive navigation and reload for the same participant',async()=>{
  const room=await (await fetch(service+'/api/rooms',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({title:'Draft persistence'})})).json(),p=await context.newPage();
  await p.goto(base+'#live');await p.locator('#live-url').fill(service);await p.locator('#join-room [name=code]').fill(room.code);await p.locator('#join-room [name=alias]').fill('Draft learner');await p.locator('#join-room button').click();await p.locator('#submission-preview').fill('UNSUBMITTED EXPLANATION → retained across visits');
  await p.evaluate(()=>location.hash='home');await p.locator('.unit-card').first().waitFor();await p.evaluate(()=>location.hash='live');await p.locator('#resume-session').click();await p.locator('#submission-preview').waitFor();assert.equal(await p.locator('#submission-preview').inputValue(),'UNSUBMITTED EXPLANATION → retained across visits');
  await p.reload();await p.locator('#resume-session').click();await p.locator('#submission-preview').waitFor();assert.equal(await p.locator('#submission-preview').inputValue(),'UNSUBMITTED EXPLANATION → retained across visits');await p.close();
 });
 if(failures.length)throw Error(failures.join('\n'));console.log('PASS: all live-class regressions.');
 }finally{if(browser)await browser.close();for(const child of children)child.kill();fs.rmSync(tmp,{recursive:true,force:true});}
})().catch(e=>{console.error(e.message);process.exitCode=1});
