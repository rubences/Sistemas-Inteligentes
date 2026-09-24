/* Validated local learning records. Scores are formative observations, not grades. */
(function(root){
'use strict';
const empty=()=>({answers:{},code:{},challenges:{},study:{}});
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const int=(x,a,b)=>Number.isInteger(x)&&x>=a&&x<=b;
function validate(raw,course){
 if(!obj(raw)||['answers','code','challenges','study'].some(k=>!obj(raw[k])))throw Error('Invalid learning record.');
 const out=empty(),questions=course.units.flatMap(u=>u.quiz),units=course.units.map(u=>String(u.id));
 for(const [id,x] of Object.entries(raw.answers)){
  if(!questions.some(q=>q.id===id)||!obj(x)||typeof x.correct!=='boolean'||!int(x.attempts,1,100000)||!int(x.last,0,8640000000000000))throw Error('Invalid concept evidence.');
  out.answers[id]={correct:x.correct,attempts:x.attempts,last:x.last};
 }
 for(const [id,x] of Object.entries(raw.code)){
  if(!units.includes(id)||typeof x!=='string'||x.length>30000)throw Error('Invalid code record. Maximum 30,000 characters per unit.');out.code[id]=x;
 }
 for(const [id,x] of Object.entries(raw.challenges)){
  if(!/^u[1-6]-(foundation|applied|extension)$/.test(id)||!obj(x)||typeof x.note!=='string'||x.note.length>5000||typeof x.done!=='boolean'||(x.done&&!x.note.trim()))throw Error('Invalid challenge evidence.');out.challenges[id]={note:x.note,done:x.done};
 }
 for(const [id,x] of Object.entries(raw.study)){
  if(!units.includes(id)||!int(x,1,course.units.find(u=>String(u.id)===id).slides))throw Error('Invalid study position.');out.study[id]=x;
 }
 return out;
}
function record(raw,questions,answers,now=Date.now()){
 const out=JSON.parse(JSON.stringify(raw));
 if(answers.length!==questions.length||!int(now,0,8640000000000000))throw Error('Invalid answer evidence.');
 questions.forEach((q,i)=>{if(!int(answers[i],0,q.options.length-1))throw Error('Invalid answer choice.');out.answers[q.id]={correct:answers[i]===q.answer,attempts:Math.min(100000,(out.answers[q.id]?.attempts||0)+1),last:now};});return out;
}
function review(raw,course,now=Date.now()){
 const priority={retry:0,due:1,unassessed:2,recent:3};
 return course.units.flatMap(u=>u.quiz.map(q=>{const a=raw.answers[q.id],status=!a?'unassessed':!a.correct?'retry':now-a.last>=7*86400000?'due':'recent';return {id:q.id,unit:u.id,question:q.question,status,attempts:a?.attempts||0,last:a?.last||0};})).sort((a,b)=>priority[a.status]-priority[b.status]||a.last-b.last);
}
const api={empty,validate,record,review};if(typeof module!=='undefined')module.exports=api;else root.LearningCore=api;
})(globalThis);
