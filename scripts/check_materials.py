#!/usr/bin/env python3
"""Check canonical material integrity, slide anchors and repository-relative links."""
import hashlib,json,re,subprocess
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
class Document(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.refs=[]; self.slides=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='section' and 'slide' in a.get('class','').split(): self.slides+=1
        for k in ('href','src'):
            if k in a: self.refs.append(a[k])
def check_ref(path,ref):
    if not ref or ref.startswith(('#','data:','http:','https:','mailto:','javascript:')): return
    local=ref.split('#')[0].split('?')[0]
    assert (path.parent/local).exists(),f'Broken link: {path.relative_to(ROOT)} -> {ref}'
course=json.loads(subprocess.check_output(['node','-e',"process.stdout.write(JSON.stringify(require('./assets/course-data.js')))"],cwd=ROOT))
assert len(course['units'])==6 and len(course['labs'])==28
assert sum(len(u['quiz']) for u in course['units'])==36
for item in json.loads((ROOT/'materials/manifest.json').read_text()):
    data=(ROOT/item['path']).read_bytes()
    assert len(data)==item['bytes'],f"Size changed: {item['path']}"
    assert hashlib.sha256(data).hexdigest()==item['sha256'],f"Checksum changed: {item['path']}"
total=0
for u in course['units']:
    for key in ('cover','deck','pdf','original','worksheet'): assert (ROOT/u[key]).is_file(),u[key]
    d=Document();d.feed((ROOT/u['deck']).read_text())
    assert d.slides==u['slides'],f"Wrong slide count in unit {u['id']}"
    assert len(d.ids)==len(set(d.ids)),f"Duplicate HTML id in unit {u['id']}"
    assert sum(a['minutes'] for a in u['agenda'])==80
    for a in u['agenda']: assert f"slide-{a['slide']}" in d.ids
    for lab_id in u['labs']:
        lab=next(l for l in course['labs'] if l['id']==lab_id)
        assert lab['unit']==u['id'] and f"slide-{lab['slide']}" in d.ids
    for q in u['quiz']: assert 0<=q['answer']<len(q['options']) and q['explanation']
    for ref in d.refs: check_ref(ROOT/u['deck'],ref)
    total+=d.slides
assert total==335
for path in ROOT.rglob('*.md'):
    if '.git' in path.parts or '.artifacts' in path.parts: continue
    for ref in re.findall(r'\]\(([^)]+)\)',path.read_text()): check_ref(path,ref)
d=Document();d.feed((ROOT/'index.html').read_text())
for ref in d.refs:check_ref(ROOT/'index.html',ref)
print(f'PASS: 6 units, {total} slides, 28 laboratory anchors, 36 questions, 12 material hashes and local links.')
