// Shared directed graph. Positive edge weights, alphabetical successor order.
const graphEdges={S:[['A',1],['B',2]],A:[['C',8],['G',9]],B:[['G',2]],C:[['D',1]],D:[],G:[]};
let search={};
function resetSearch(){search={method:byId('search-method').value,frontier:[{s:'S',g:0,d:0,path:['S'],seq:0}],discovered:new Set(['S']),best:{S:0},order:[],expanded:[],selected:null,result:null,done:false,seq:1,message:'Ready. S is the initial candidate with g = 0.'};renderSearch();}
function frontierOrdered(){const f=search.frontier.slice();if(search.method==='ucs')f.sort((a,b)=>a.g-b.g||a.seq-b.seq);return f;}
function renderSearch(){byId('search-order').textContent=search.order.join(' → ')||'None selected';byId('search-frontier').innerHTML=frontierOrdered().map(n=>'<span class="frontier-token'+(search.method==='ucs'&&n.g!==search.best[n.s]?' stale':'')+'">'+n.s+' · g='+n.g+' · d='+n.d+(search.method==='ucs'&&n.g!==search.best[n.s]?' · stale':'')+'</span>').join('')||'<span class="small">Empty</span>';byId('search-status').textContent=search.message;byId('search-step').disabled=search.done;byId('search-run').disabled=search.done;document.querySelectorAll('#search-canvas .graph-node').forEach(e=>{const s=e.dataset.state;e.classList.toggle('selected',s===search.selected);e.classList.toggle('expanded',search.expanded.includes(s));e.classList.toggle('frontier',search.frontier.some(n=>n.s===s));e.classList.toggle('on-solution',!!search.result&&search.result.path.includes(s));});document.querySelectorAll('#search-canvas .graph-edge').forEach(e=>e.classList.toggle('on-solution',!!search.result&&search.result.path.some((x,i,a)=>i<a.length-1&&e.dataset.edge===x+'-'+a[i+1])));}
function searchStep(){if(search.done)return;let n;
 while(search.frontier.length){if(search.method==='ucs')search.frontier.sort((a,b)=>a.g-b.g||a.seq-b.seq);n=search.frontier.shift();if(search.method!=='ucs'||n.g===search.best[n.s])break;n=null;}
 if(!n){search.done=true;search.message='FAILURE: the reachable frontier is exhausted.';renderSearch();return;}
 search.selected=n.s;search.order.push(n.s);
 if(n.s==='G'){search.done=true;search.result=n;search.message='GOAL selected: '+n.path.join(' → ')+'. '+n.d+' actions, cost '+n.g+'.';renderSearch();return;}
 search.expanded.push(n.s);const kids=[];const updates=[];
 for(const [s,cost] of graphEdges[n.s]){const g=n.g+cost;
  if(search.method==='ucs'){if(g>=(search.best[s]??Infinity))continue;if(search.best[s]!==undefined)updates.push(s+': '+search.best[s]+' → '+g);search.best[s]=g;}
  else{if(search.discovered.has(s))continue;search.discovered.add(s);}
  kids.push({s,g,d:n.d+1,path:[...n.path,s],seq:search.seq++});
 }
 if(search.method==='dfs')search.frontier=[...kids,...search.frontier];else search.frontier.push(...kids);
 search.message='Selected and expanded '+n.s+' at g = '+n.g+'. '+(updates.length?'Improved '+updates.join(', ')+'.':kids.length+' new candidate'+(kids.length===1?'':'s')+'.');renderSearch();
}
function runSearch(){let guard=0;while(!search.done&&guard++<100)searchStep();}
byId('search-step').onclick=searchStep;byId('search-run').onclick=runSearch;byId('search-reset').onclick=resetSearch;byId('search-method').onchange=resetSearch;resetSearch();
function formatCount(n){return n.toLocaleString('en-US');}
function updateTree(){const b=+byId('branching').value,d=+byId('depth').value;let total=0;for(let i=0;i<=d;i++)total+=b**i;const bytes=total*128;let val=bytes,unit='bytes';for(const u of ['KiB','MiB','GiB','TiB']){if(val<1024)break;val/=1024;unit=u;}byId('branching-value').textContent=b;byId('depth-value').textContent=d;byId('level-count').textContent=formatCount(b**d);byId('tree-count').textContent=formatCount(total);byId('memory-count').textContent=val.toLocaleString('en-US',{maximumFractionDigits:2})+' '+unit;}
byId('branching').oninput=updateTree;byId('depth').oninput=updateTree;updateTree();
const depthTree={S:['A','B'],A:['C'],B:['D'],C:['G'],D:[],G:[]};
function computeDLS(limit){const order=[];function visit(s,left,path){order.push(s);if(s==='G')return {kind:'SOLUTION',path:[...path,s]};const kids=depthTree[s].filter(x=>!path.includes(x));if(!kids.length)return {kind:'FAILURE'};if(left===0)return {kind:'CUTOFF'};let cutoff=false;for(const x of kids){const r=visit(x,left-1,[...path,s]);if(r.kind==='SOLUTION')return r;if(r.kind==='CUTOFF')cutoff=true;}return {kind:cutoff?'CUTOFF':'FAILURE'};}return {...visit('S',limit,[]),order};}
function updateDLS(){const limit=+byId('depth-limit').value,r=computeDLS(limit);byId('limit-value').textContent=limit;byId('dls-result').textContent=r.kind;byId('dls-order').textContent=r.order.join(' → ');byId('dls-explain').textContent=r.kind==='SOLUTION'?'Path: '+r.path.join(' → ')+'. Three actions.':r.kind==='CUTOFF'?'At least one nonterminal branch reached the depth bound.':'All available branches were exhausted.';document.querySelectorAll('.depth-node').forEach(n=>n.classList.toggle('outside',+n.dataset.depth>limit));}
byId('depth-limit').oninput=updateDLS;updateDLS();
function solveCoins(target){const inv=[1,4,1,4],vals=[50,10,5,1];const start={inv,p:target,path:[]};const q=[start],key=n=>n.inv.join(',')+'|'+n.p;const seen=new Set([key(start)]);let head=0,expanded=0,peak=1;
 while(head<q.length){const n=q[head++];if(n.p===0)return {path:n.path,expanded,peak};expanded++;
  vals.forEach((v,i)=>{if(n.inv[i]===0||v>n.p)return;const stock=n.inv.slice();stock[i]--;const next={inv:stock,p:n.p-v,path:[...n.path,v]},k=key(next);if(!seen.has(k)){seen.add(k);q.push(next);}});
  peak=Math.max(peak,q.length-head);
 }return {path:null,expanded,peak};}
function updateCoins(){const raw=byId('coin-target').value,n=Number(raw);if(raw.trim()===''||!Number.isInteger(n)||n<0||n>99){byId('coin-status').textContent='Enter a whole number from 0 to 99.';byId('coin-count').textContent='—';byId('coin-path').textContent='—';byId('coin-metrics').textContent='—';return;}const r=solveCoins(n);byId('coin-count').textContent=r.path===null?'No solution':r.path.length;byId('coin-path').textContent=r.path===null?'None':r.path.length?r.path.map(v=>v+'c').join(' + '):'Empty sequence';byId('coin-metrics').textContent=r.expanded+' / '+r.peak;byId('coin-status').textContent=r.path===null?'FAILURE: finite reachable space exhausted.':'Verified sum: '+r.path.reduce((a,b)=>a+b,0)+' cents. Inventory limits respected.';}
byId('coin-solve').onclick=updateCoins;updateCoins();
window.presentation={go,slides,resetSearch,searchStep,runSearch,getSearch:()=>({method:search.method,order:[...search.order],result:search.result,done:search.done,frontier:frontierOrdered()}),computeDLS,solveCoins,updateTree};
