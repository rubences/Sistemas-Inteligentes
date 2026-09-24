#!/usr/bin/env python3
"""Rebuild self-contained lectures using only the Python standard library."""
import argparse,base64,html,json,re
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output',type=Path,default=ROOT/'.artifacts/rebuilt')
args=parser.parse_args(); args.output.mkdir(parents=True,exist_ok=True)
fontcss=''
for weight in (400,700):
 encoded=base64.b64encode((ROOT/f'assets/roboto-{weight}.woff2').read_bytes()).decode()
 fontcss+=f"@font-face{{font-family:Lecture;src:url(data:font/woff2;base64,{encoded}) format('woff2');font-weight:{weight};font-display:swap;}}"
titles=['Intelligent agents','Problem solving and search','Informed search','Constraint satisfaction','Adversarial search','Reinforcement learning']
for num,title in enumerate(titles,1):
 data=json.loads((HERE/f'unit{num}-content.json').read_text(encoding='utf-8'))
 imageurl='data:image/jpeg;base64,'+base64.b64encode((ROOT/f'assets/unit-{num}.jpg').read_bytes()).decode()
 css=(HERE/'base.css').read_text().replace('__COVER__',imageurl)
 css=re.sub(r'(?<![\w-])#slide-(13|40|42)\b',r'.unit1 #slide-\1',css)
 css+='\n'+(HERE/'extra.css').read_text()
 if (HERE/f'unit{num}.css').exists(): css+='\n'+(HERE/f'unit{num}.css').read_text()
 parts=[]
 for i,s in enumerate(data):
  tag='h1' if i==0 else 'h2'
  parts.append(f'''<section class="slide {s['cls']}" id="slide-{i+1}" data-notes="{html.escape(s['notes'],quote=True)}" aria-label="{i+1}. {html.escape(s['title'].replace('<br>',' '),quote=True)}"><header class="slide-head"><div class="brand">UCLM<span>Universidad de Castilla-La Mancha</span></div><span class="chapter">{s['ch']}</span></header><{tag} class="slide-title">{s['title']}</{tag}>{('<p class="slide-sub">'+s['sub']+'</p>') if s['sub'] else ''}<div class="slide-content">{s['body']}</div><footer class="slide-foot"><span class="ref">{html.escape(s['ref'])}</span><span class="slide-num">{i+1:02} / {len(data)}</span></footer><details class="study-notes"><summary>Teaching and study notes</summary><p>{html.escape(s['notes'])}</p></details></section>''')
 page=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="UCLM Intelligent Systems. Unit {num}: {title}. Interactive English presentation with offline simulations and teaching notes."><title>UCLM · Unit {num} · {title}</title><style>{fontcss}{css}</style></head><body class="unit{num}"><nav class="toolbar" aria-label="Presentation controls"><strong>UCLM · Unit {num} · {title}</strong><button id="prev" aria-label="Previous slide">←</button><span id="counter" aria-live="polite"></span><button id="next" aria-label="Next slide">→</button><button id="index">Index</button><button id="notes" aria-expanded="false">Notes</button><button id="study" aria-pressed="false">Study mode</button><button id="fullscreen">Full screen</button><button id="print">Print</button></nav><div id="app"><main id="stage"><div id="deck">{''.join(parts)}</div></main><aside class="notes-panel" id="notes-panel" hidden><button id="close-notes">Close notes</button><h2 id="notes-title"></h2><p id="notes-text"></p><hr><p>Shortcuts: ← → navigate · I index · N notes · E study mode · F full screen.</p></aside></div><dialog id="index-dialog"><div class="dialog-head"><h2>Unit index</h2><button id="close-index">Close</button></div><div id="index-items"></div></dialog><p id="status" role="status" style="position:fixed;bottom:0;left:0;margin:0;background:#fff;color:#111;font-size:16px"></p><noscript><style>#app{{height:auto}}#stage{{overflow:visible}}#deck{{position:static;transform:none;width:100%;height:auto}}.slide{{display:flex;width:100%;height:auto;min-height:800px}}.toolbar{{display:none}}</style>Enable JavaScript for simulations and navigation. The static content remains available.</noscript><script>'''+(HERE/'nav.js').read_text()+'\n'+(HERE/f'unit{num}.js').read_text()+'''\nif(window.innerWidth<760)toggleStudy();go(current,false);document.fonts.ready.then(fit);</script></body></html>'''
 filename=next((ROOT/'materials/lectures').glob(f'UCLM_Unit{num}_*.html')).name
 path=args.output/filename
 path.write_text(page,encoding='utf-8')
 print(f'Unit {num}: {len(data)} slides → {path}')
