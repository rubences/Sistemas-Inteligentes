/* Pure validation, scoring and clock logic. No network or browser dependencies. */
(function(root){
 'use strict';
 const empty=()=>({version:1,completed:[],labs:{},quizzes:{}});
 const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
 const integer=(x,min,max)=>Number.isInteger(x)&&x>=min&&x<=max;
 function validate(raw,course){
  if(!object(raw)||raw.version!==1||!Array.isArray(raw.completed)||!object(raw.labs)||!object(raw.quizzes))throw Error('This is not a version 1 course progress file.');
  const ids=course.units.map(u=>u.id),labs=course.labs.map(l=>l.id),out=empty();
  if(raw.completed.length>ids.length||raw.completed.some(id=>!ids.includes(id)))throw Error('The progress file contains an unknown unit.');
  out.completed=[...new Set(raw.completed)].sort((a,b)=>a-b);
  for(const [id,x] of Object.entries(raw.labs)){
   if(!labs.includes(id)||!object(x)||typeof x.note!=='string'||x.note.length>3000||typeof x.done!=='boolean'||(x.done&&!x.note.trim()))throw Error('A laboratory entry is invalid. Notes must contain at most 3,000 characters and completed work needs evidence.');
   out.labs[id]={note:x.note,done:x.done};
  }
  for(const [id,x] of Object.entries(raw.quizzes)){
   const u=course.units.find(u=>String(u.id)===id),n=u?.quiz.length;
   if(!u||!object(x)||!integer(x.best,0,n)||!integer(x.last,0,n)||x.best<x.last||!integer(x.attempts,1,100000))throw Error('A quiz result is invalid.');
   out.quizzes[id]={best:x.best,last:x.last,attempts:x.attempts};
  }
  return out;
 }
 function score(questions,answers){if(!Array.isArray(answers)||answers.length!==questions.length||answers.some((a,i)=>!integer(a,0,questions[i].options.length-1)))throw Error('Answer every question with a valid choice.');return answers.reduce((n,a,i)=>n+(a===questions[i].answer?1:0),0);}
 function recordQuiz(progress,unit,result,total){if(!integer(unit,1,6)||!integer(result,0,total))throw Error('Invalid quiz result.');const p=JSON.parse(JSON.stringify(progress)),old=p.quizzes[String(unit)];p.quizzes[String(unit)]={best:Math.max(old?.best??0,result),last:result,attempts:(old?.attempts??0)+1};return p;}
 function timer(seconds){if(!Number.isFinite(seconds)||seconds<0)throw Error('Invalid duration.');return {seconds,deadline:null,running:false};}
 const remaining=(t,now)=>Math.max(0,t.running?(t.deadline-now)/1000:t.seconds);
 const start=(t,now)=>t.running?t:{...t,running:true,deadline:now+t.seconds*1000};
 const pause=(t,now)=>({seconds:remaining(t,now),deadline:null,running:false});
 const api={empty,validate,score,recordQuiz,timer,remaining,start,pause};
 if(typeof module!=='undefined')module.exports=api;else root.ProgressCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
