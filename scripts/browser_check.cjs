/* Optional browser verification: npm install --no-save playwright; npx playwright install chromium */
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),course=require('../assets/course-data.js');
(async()=>{
 const options={headless:true};
 if(process.env.CHROMIUM_EXECUTABLE)options.executablePath=process.env.CHROMIUM_EXECUTABLE;
 if(process.env.CHROMIUM_ARGS)options.args=JSON.parse(process.env.CHROMIUM_ARGS);
 const browser=await chromium.launch(options),page=await browser.newPage({viewport:{width:1440,height:1000}});
 const base=process.env.CAMPUS_URL||'file://'+root+'/index.html',errors=[];
 page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));
 const go=async hash=>{await page.goto(base+'#'+hash);await page.locator('h1').waitFor();};
 fs.mkdirSync(root+'/.artifacts',{recursive:true});
 await go('home');await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('.unit-card').count(),6);
 await page.screenshot({path:root+'/.artifacts/campus-desktop.png',fullPage:true});
 for(const route of ['units','labs','practice','classroom','project','resources','unit/6','lab/u6-l5','not-a-route']){
  await go(route);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route);
 }
 await go('labs');assert.equal(await page.locator('.lab-row').count(),28);
 await page.locator('#lab-search').fill('zzzzzz');assert.equal(await page.locator('.lab-row').count(),0);
 await page.getByRole('button',{name:'Clear filters'}).click();await page.selectOption('#lab-filter','6');assert.equal(await page.locator('.lab-row').count(),5);
 await go('lab/u1-l1');await page.locator('#lab-done').check();await page.getByRole('button',{name:'Save evidence'}).click();
 assert.match(await page.locator('#toast').textContent(),/Record your evidence/);
 const note='<img src=x onerror="window.XSS=true"> prediction → evidence';
 await page.locator('#evidence').fill(note);await page.getByRole('button',{name:'Save evidence'}).click();await page.reload();
 assert.equal(await page.locator('#evidence').inputValue(),note);assert.equal(await page.evaluate(()=>window.XSS),undefined);
 for(const u of course.units){
  await go('unit/'+u.id);await page.getByRole('button',{name:'Start self-check'}).click();
  await page.getByRole('button',{name:'Check answer'}).click();assert.match(await page.locator('#toast').textContent(),/Choose an answer/);
  for(const q of u.quiz){await page.locator(`input[name=answer][value="${q.answer}"]`).check();await page.getByRole('button',{name:'Check answer'}).click();await page.locator('[data-action=quiz-next]').click();}
  assert.equal((await page.locator('.score').textContent()).trim(),'6 / 6');
 }
 await page.reload();const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('uclm-si-progress-v1')));assert.equal(stored.quizzes['6'].attempts,1);
 await go('resources');await page.locator('#import-file').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"version":99}')});
 await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('Import rejected'));
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('uclm-si-progress-v1'))),stored);
 const backup={...stored,completed:[1,2],labs:Object.fromEntries(course.labs.map(l=>[l.id,{note:('é\\\n').repeat(1000),done:true}]))};page.once('dialog',d=>d.accept());
 await page.locator('#import-file').setInputFiles({name:'valid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
 await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('Progress imported'));
 assert.match(await page.locator('#progress-summary').textContent(),/^2\/6/);assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('uclm-si-progress-v1'))),backup);
 const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress'}).click();assert.equal((await downloaded).suggestedFilename(),'intelligent-systems-progress.json');
 await go('classroom');await page.getByRole('button',{name:'Start',exact:true}).click();await page.waitForTimeout(1150);await page.getByRole('button',{name:'Pause',exact:true}).click();const paused=await page.locator('#clock').textContent();await page.waitForTimeout(400);assert.equal(await page.locator('#clock').textContent(),paused);
 await page.getByRole('button',{name:'Next phase →'}).click();assert.equal(await page.locator('#clock').textContent(),'20:00');
 await page.screenshot({path:root+'/.artifacts/campus-classroom.png',fullPage:true});
 // Every catalogue anchor must open an actual visible simulation control.
 console.log('Campus interactions passed; checking laboratory controls.');
 const lecture=await browser.newPage({viewport:{width:1440,height:1000}});lecture.on('pageerror',e=>errors.push(e.message));
 for(const l of course.labs){const u=course.units.find(x=>x.id===l.unit);await lecture.goto(new URL(u.deck+'#'+l.slide,base).href);await lecture.locator(`#slide-${l.slide}.current`).waitFor();const controls=lecture.locator(`#slide-${l.slide} button,#slide-${l.slide} input,#slide-${l.slide} select`);assert.ok(await controls.count()>0,l.id);const b=lecture.locator(`#slide-${l.slide} button:visible:enabled`).first();if(await b.count())await b.click();}
 console.log('All laboratory anchors passed; checking mobile and offline.');
 const mobile=await browser.newPage({viewport:{width:390,height:844}});mobile.on('pageerror',e=>errors.push(e.message));
 for(const route of ['home','units','unit/4','labs','lab/u1-l1','practice','classroom','project','resources']){await mobile.goto(base+'#'+route);await mobile.locator('h1').waitFor();assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'mobile '+route);}
 await mobile.goto(base+'#home');await mobile.locator('#menu-toggle').click();assert.equal(await mobile.locator('#menu-toggle').getAttribute('aria-expanded'),'true');await mobile.locator('[data-nav=labs]').click();await mobile.waitForFunction(()=>document.querySelector('#menu-toggle').getAttribute('aria-expanded')==='false');assert.equal(await mobile.locator('#menu-toggle').getAttribute('aria-expanded'),'false');
 await mobile.goto(base+'#home');await mobile.screenshot({path:root+'/.artifacts/campus-mobile.png',fullPage:true});
 const offline=await browser.newPage();await offline.context().setOffline(true);await offline.goto('file://'+root+'/index.html#unit/6');await offline.locator('h1').waitFor();assert.match(await offline.locator('h1').textContent(),/Reinforcement/);
 assert.deepEqual(errors,[]);
 console.log('PASS: routes, mobile layout, 28 simulation anchors/controls, 36 quiz answers, notes, import/export, timer and offline loading.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
