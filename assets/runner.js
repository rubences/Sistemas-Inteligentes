const PythonRunner=(()=>{
'use strict';let frame=null,ready=false,pending=null,busy=false,watchdog=null,runId=0;
const $=id=>document.getElementById(id);
function status(text){if($('runner-status'))$('runner-status').textContent=text;}
function finish(){clearTimeout(watchdog);busy=false;pending=null;if($('stop-python'))$('stop-python').disabled=true;document.querySelectorAll('[data-learn=run],[data-learn=check]').forEach(b=>b.disabled=false);}
function send(){if(ready&&pending&&frame){frame.contentWindow.postMessage({channel:'uclm-python',type:'run',...pending},'*');pending=null;}}
window.addEventListener('message',e=>{if(!frame||e.source!==frame.contentWindow||e.data?.channel!=='uclm-python')return;const d=e.data;if(d.type==='sandbox-ready'){ready=true;send();return;}if(!busy||d.runId!==runId)return;
 if(d.type==='output'&&$('python-output'))$('python-output').textContent=($('python-output').textContent+String(d.text)).slice(0,22000);
 if(d.type==='executing')status('Python is running…');
 if(d.type==='done'){status('Execution completed.');if(!$('python-output').textContent)$('python-output').textContent='Completed without printed output.';finish();}
 if(d.type==='error'){status('Execution needs attention.');if($('python-output'))$('python-output').textContent+=String(d.text);finish();}
});
function mount(){frame=$('python-sandbox');ready=false;pending=null;busy=false;frame?.contentWindow?.postMessage({channel:'uclm-python',type:'ping'},'*');}
function run(python,checks){if(!frame||busy)return;if(location.protocol==='file:'){status('Open the hosted campus, or run python -m http.server 8000 and use http://localhost:8000.');return;}busy=true;$('python-output').textContent='';status('Loading the Python runtime…');$('stop-python').disabled=false;document.querySelectorAll('[data-learn=run],[data-learn=check]').forEach(b=>b.disabled=true);pending={python,checks,runId:++runId};watchdog=setTimeout(()=>{stop(false);status('The runtime did not respond. Check network access and try again.');},72000);send();}
function stop(show=true){if(frame)frame.contentWindow?.postMessage({channel:'uclm-python',type:'stop'},'*');finish();if(show)status('Execution stopped. Your code is saved.');}
return {mount,run,stop};
})();
