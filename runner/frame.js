'use strict';
let worker=null,timer=null;
const send=data=>parent.postMessage({channel:'uclm-python',...data},'*');
function stop(){clearTimeout(timer);worker?.terminate();worker=null;}
window.addEventListener('message',e=>{
 if(e.source!==parent||e.data?.channel!=='uclm-python')return;
 if(e.data.type==='ping'){send({type:'sandbox-ready'});return;}
 if(e.data.type==='stop'){stop();return;}
 if(e.data.type!=='run'||!Number.isInteger(e.data.runId)||typeof e.data.python!=='string'||e.data.python.length>30000||typeof e.data.checks!=='string'||e.data.checks.length>10000)return;
 stop();const runId=e.data.runId,reply=data=>send({...data,runId});
 // Data URLs support module workers from an opaque origin; blob:null modules do not.
 const url='data:text/javascript,'+encodeURIComponent(document.getElementById('worker-source').textContent);
 try{worker=new Worker(url,{type:'module'});}catch(err){reply({type:'error',text:err.message});return;}
 const current=worker;
 timer=setTimeout(()=>{stop();reply({type:'error',text:'Runtime loading exceeded 60 seconds. Check your connection and try again.'});},60000);
 current.onmessage=({data})=>{if(worker!==current)return;if(data.type==='executing'){clearTimeout(timer);timer=setTimeout(()=>{stop();reply({type:'error',text:'Execution stopped after 10 seconds. Reduce the problem or fix an infinite loop.'});},10000);}reply(data);if(data.type==='done'||data.type==='error')stop();};
 current.onerror=e=>{if(worker!==current)return;stop();reply({type:'error',text:e.message||'The Python runtime could not load. Check network access to cdn.jsdelivr.net.'});};
 current.postMessage({python:e.data.python,checks:e.data.checks});
});
send({type:'sandbox-ready'});
