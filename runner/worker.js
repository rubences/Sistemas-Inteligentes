// Runs only in an opaque-origin sandbox worker. No parent page or localStorage access.
const load=()=>import('https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs').then(async m=>{
 const py=await m.loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/'});
 let used=0,messages=0,truncated=false;
 const emit=text=>{if(used<20000&&messages<500){const out=String(text).slice(0,20000-used-1)+'\n';used+=out.length;messages++;self.postMessage({type:'output',text:out});}else if(!truncated){truncated=true;self.postMessage({type:'output',text:'[Output truncated]\n'});}};
 py.setStdout({batched:emit});py.setStderr({batched:emit});return py;
});
self.onmessage=async({data})=>{
 try{const py=await load();self.postMessage({type:'executing'});
  await py.runPythonAsync(data.python+'\n\n'+data.checks);
  self.postMessage({type:'done'});
 }catch(e){self.postMessage({type:'error',text:String(e.message||e).slice(0,12000)});}
};
