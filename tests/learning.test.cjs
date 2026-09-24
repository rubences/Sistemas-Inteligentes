const test=require('node:test'),assert=require('node:assert/strict');
const C=require('../assets/course-data.js');
let L;try{L=require('../assets/learning-core.js')}catch{}
test('learning API exists',()=>assert.equal(typeof L?.validate,'function'));
test('learning records preserve Unicode notes and code',()=>{assert.ok(L);const p=L.empty();p.code['1']='print("é")';p.challenges['u1-foundation']={note:'Evidence <tag>',done:true};assert.deepEqual(L.validate(p,C),p);});
test('learning import rejects unknown ids, malformed answers and oversized code',()=>{assert.ok(L);for(const change of [p=>p.code['7']='x',p=>p.code['1']='x'.repeat(30001),p=>p.answers.u1q1={correct:3,attempts:1,last:0},p=>p.challenges['u1-foundation']={note:'',done:true},p=>p.study['2']=99]){const p=L.empty();change(p);assert.throws(()=>L.validate(p,C));}});
test('revisit ordering prioritizes errors; unseen concepts remain unassessed',()=>{assert.ok(L);let p=L.empty();p=L.record(p,C.units[0].quiz,[0,2,0,1,0,1],1000);const list=L.review(p,C,1001);assert.equal(list[0].id,'u1q1');assert.equal(list.find(x=>x.id==='u2q1').status,'unassessed');assert.equal(L.review(p,C,9*86400000).find(x=>x.id==='u1q2').status,'due');});
