#!/usr/bin/env python3
"""Validate generated curriculum, links, LMS exports and executable worked examples."""
import csv,json,re,subprocess,xml.etree.ElementTree as ET
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads(subprocess.check_output(['node','-e',f"process.stdout.write(JSON.stringify(require('./assets/{name}.js')))"],cwd=ROOT))
c=load('course-data');d=load('learning-data');index=load('search-data')
assert len(index)==335 and len(d['challenges'])==18 and len(d['glossary'])==40 and len(d['weeks'])==15
assert {(s['unit'],s['slide']) for s in index}=={(u['id'],i) for u in c['units'] for i in range(1,u['slides']+1)}
assert all(s['title'] and s['notes'] and s['text'] for s in index)
assert set(d['concepts'])=={q['id'] for u in c['units'] for q in u['quiz']}
for x in d['challenges']:assert sum(r['weight'] for r in x['rubric'])==100 and x['hints'] and x['evidence']
for exercise in d['exercises']:
 result=subprocess.run(['python3','-c',exercise['worked']+'\n'+exercise['checks']],capture_output=True,text=True,timeout=10)
 assert result.returncode==0 and 'PASS' in result.stdout,result.stderr
q=ET.parse(ROOT/'integration/moodle-questions.xml').getroot();questions=q.findall("question[@type='multichoice']")
assert len(questions)==36
for x in questions:assert len(x.findall("answer[@fraction='100']"))==1 and x.findtext('generalfeedback/text')
assert len(list(csv.DictReader((ROOT/'integration/teaching-plan.csv').open())))==15
html=(ROOT/'runner/index.html').read_text();worker=re.search(r'<script type="text/plain" id="worker-source">([\s\S]*?)</script>',html).group(1)
assert worker.strip()==(ROOT/'runner/worker.js').read_text().strip(),'Keep embedded sandbox worker synchronized.'
print('PASS: 335 indexed slides, 18 challenges, 40 glossary terms, 15 weeks, 36 Moodle questions and all six executable worked examples.')
