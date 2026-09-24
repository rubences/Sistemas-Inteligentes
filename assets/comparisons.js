/* Bounded, deterministic algorithms for controlled classroom comparisons. */
(function(root){
'use strict';
const scenarios={cost:{start:'S',goal:'G',graph:{S:[['G',10],['A',1]],A:[['G',2]],G:[]},heuristic:{S:0,A:0,G:0}},reopen:{start:'S',goal:'G',graph:{S:[['A',3],['B',1]],A:[['G',2]],B:[['A',1],['G',100]],G:[]},heuristic:{S:4,A:0,B:3,G:0}}};
function search(x,method,budget=1000){
 if(!['bfs','ucs','greedy','astar'].includes(method)||!Number.isInteger(budget)||budget<0||budget>10000)throw Error('Invalid method or budget (0–10,000).');
 if(!x||!x.graph||typeof x.graph!=='object'||Array.isArray(x.graph))throw Error('Supply an adjacency object.');
 const nodes=new Set(Object.keys(x.graph));let edges=0;
 for(const [s,es] of Object.entries(x.graph)){if(!Array.isArray(es))throw Error('Edges must be arrays.');for(const e of es){if(!Array.isArray(e)||e.length!==2||typeof e[0]!=='string'||!Number.isFinite(e[1])||e[1]<0||e[1]>1e9)throw Error('Each edge needs a node label and a cost in [0,10^9].');nodes.add(e[0]);edges++;}}
 if(nodes.size>100||edges>400||!nodes.has(x.start)||!nodes.has(x.goal)||[...nodes].some(n=>!n||n.length>40))throw Error('Use at most 100 labelled nodes and 400 edges, including start and goal.');
 const h=n=>x.heuristic?.[n]??0;
 if([...nodes].some(n=>!Number.isFinite(h(n))||h(n)<0)||h(x.goal)!==0)throw Error('Use nonnegative finite heuristics and zero at the goal.');
 let serial=0,expanded=0,reopened=0,peak=1;const best=new Map([[x.start,0]]),parent=new Map([[x.start,null]]),closed=new Set(),trace=[];
 const priority=(g,n)=>method==='bfs'?0:method==='ucs'?g:method==='greedy'?h(n):g+h(n);
 const queue=[{s:x.start,g:0,f:priority(0,x.start),seq:serial++}];
 const result=(status,s=null,g=null)=>{const path=[];for(let n=s;n!==null;n=parent.get(n))path.unshift(n);return {method,status,path,cost:g,expanded,reopened,peak,trace};};
 while(queue.length){queue.sort((a,b)=>a.f-b.f||a.seq-b.seq);const n=queue.shift();if(n.g!==best.get(n.s))continue;if(trace.length<60)trace.push(`${n.s}: g=${n.g}, priority=${n.f}`);if(n.s===x.goal)return result('SOLVED',n.s,n.g);if(expanded>=budget)return result('CUTOFF');if(closed.has(n.s))reopened++;closed.add(n.s);expanded++;
  for(const [child,cost] of x.graph[n.s]||[]){const g=n.g+cost;if(method==='bfs'?best.has(child):g>=(best.get(child)??Infinity))continue;best.set(child,g);parent.set(child,n.s);queue.push({s:child,g,f:priority(g,child),seq:serial++});}peak=Math.max(peak,queue.length);
 }return result('EXHAUSTED');
}
function game(tree,prune=true){let nodes=0,leaves=0;const trace=[];
 function check(n,depth=0){if(++nodes>10000||depth>10)throw Error('Tree exceeds the limit: 10 levels / 10,000 nodes.');if(typeof n==='number'&&Number.isFinite(n))return;if(!Array.isArray(n)||!n.length)throw Error('Use finite leaves and nonempty arrays.');n.forEach(c=>check(c,depth+1));}check(tree);
 function visit(n,max,a,b,path){if(typeof n==='number'){leaves++;return {value:n,action:null};}let value=max?-Infinity:Infinity,action=null;for(let i=0;i<n.length;i++){const v=visit(n[i],!max,a,b,path+'.'+i).value;if(action===null||(max?v>value:v<value)){value=v;action=i;}if(max)a=Math.max(a,value);else b=Math.min(b,value);if(prune&&a>=b){if(i<n.length-1)trace.push(`Cut ${path}: alpha=${a}, beta=${b}; ${n.length-i-1} remaining child branch(es).`);break;}}return {value,action};}
 return {...visit(tree,true,-Infinity,Infinity,'root'),leaves,trace};
}
function rng(seed){let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
function rl({episodes=200,seeds=5,epsilon=.2}={}){
 if(!Number.isInteger(episodes)||episodes<1||episodes>2000||!Number.isInteger(seeds)||seeds<1||seeds>10||!Number.isFinite(epsilon)||epsilon<0||epsilon>1)throw Error('Use 1–2,000 episodes, 1–10 seeds and epsilon in [0,1].');
 // 4x4 deterministic grid; start 12, goal 3 (+1); hazards 5 and 9 (-1); living reward -0.04.
 const step=(s,a)=>{const r=Math.floor(s/4),c=s%4,dr=[-1,0,1,0][a],dc=[0,1,0,-1][a],t=4*Math.max(0,Math.min(3,r+dr))+Math.max(0,Math.min(3,c+dc));return {s:t,reward:t===3?1:[5,9].includes(t)?-1:-.04,terminal:[3,5,9].includes(t)};};
 return ['Q-learning','SARSA'].map(method=>{const runs=[];
 for(let seed=1;seed<=seeds;seed++){const random=rng(seed),Q=Array.from({length:16},()=>[0,0,0,0]),greedy=s=>Q[s].indexOf(Math.max(...Q[s])),choose=s=>random()<epsilon?Math.floor(random()*4):greedy(s);let training=0,trainingCaps=0;
  for(let e=0;e<episodes;e++){let s=12,a=choose(s),ended=false;for(let t=0;t<64;t++){const n=step(s,a),next=choose(n.s),cont=n.terminal?0:method==='Q-learning'?Math.max(...Q[n.s]):Q[n.s][next];Q[s][a]+=.2*(n.reward+.9*cont-Q[s][a]);training+=n.reward;if(n.terminal){ended=true;break;}s=n.s;a=next;}if(!ended)trainingCaps++;}
  let total=0,success=0,cutoffs=0;for(const initial of [12,8,13,14,0]){let s=initial,ended=false;for(let t=0;t<64;t++){const n=step(s,greedy(s));total+=n.reward;s=n.s;if(n.terminal){ended=true;if(s===3)success++;break;}}if(!ended)cutoffs++;}
  runs.push({seed,trainingMean:training/episodes,trainingCaps,evaluationMean:total/5,evaluationEpisodes:5,success:success/5,cutoffs});
 }
 const mean=runs.reduce((n,r)=>n+r.evaluationMean,0)/seeds,sd=seeds>1?Math.sqrt(runs.reduce((n,r)=>n+(r.evaluationMean-mean)**2,0)/(seeds-1)):0;
 return {method,runs,mean,sd,success:runs.reduce((n,r)=>n+r.success,0)/seeds,cutoffs:runs.reduce((n,r)=>n+r.cutoffs,0)};});
}
const api={scenarios,search,game,rl};if(typeof module!=='undefined')module.exports=api;else root.Comparisons=api;
})(globalThis);
