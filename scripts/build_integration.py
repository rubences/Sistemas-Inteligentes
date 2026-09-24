#!/usr/bin/env python3
"""Generate LMS exports from the same public campus source."""
import csv,json,subprocess,xml.etree.ElementTree as ET
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads(subprocess.check_output(['node','-e',f"process.stdout.write(JSON.stringify(require('./assets/{name}.js')))"],cwd=ROOT))
course=load('course-data');learning=load('learning-data');out=ROOT/'integration';out.mkdir(exist_ok=True)
quiz=ET.Element('quiz')
def elem(parent,tag,text=None,**attrs):
 e=ET.SubElement(parent,tag,attrs)
 if text is not None:e.text=str(text)
 return e
for unit in course['units']:
 elem(elem(elem(quiz,'question',type='category'),'category'),'text',f"$course$/Intelligent Systems/Unit {unit['id']}")
 for q in unit['quiz']:
  question=elem(quiz,'question',type='multichoice');elem(elem(question,'name'),'text',q['id'])
  elem(elem(question,'questiontext',format='plain_text'),'text',q['question'])
  elem(elem(question,'generalfeedback',format='plain_text'),'text',q['explanation'])
  for tag,value in [('defaultgrade',1),('penalty',0),('hidden',0),('single','true'),('shuffleanswers','true'),('answernumbering','abc')]:elem(question,tag,value)
  for i,option in enumerate(q['options']):elem(elem(question,'answer',fraction='100' if i==q['answer'] else '0',format='plain_text'),'text',option)
ET.indent(quiz);ET.ElementTree(quiz).write(out/'moodle-questions.xml',encoding='utf-8',xml_declaration=True)
with (out/'teaching-plan.csv').open('w',newline='',encoding='utf-8') as f:
 writer=csv.DictWriter(f,fieldnames=list(learning['weeks'][0]));writer.writeheader();writer.writerows(learning['weeks'])
text='# Challenge assignment briefs\n\nAll work and reflection should be written in English. Suggested formative criteria follow each brief. The instructor sets official deadlines, weighting and submission rules.\n\n'
for c in learning['challenges']:
 text+=f"## {c['id']}: {c['title']}\n\nEstimated time: {c['minutes']} minutes.\n\n{c['prompt']}\n\n**Deliverable:** {c['evidence']}\n\n"
 for r in c['rubric']:text+=f"- {r['item']} ({r['weight']}%): {r['description']}\n"
 text+='\nSubmit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.\n\n'
(out/'assignment-briefs.md').write_text(text,encoding='utf-8')
print('Built 36 Moodle questions, 15-week CSV and 18 assignment briefs.')
