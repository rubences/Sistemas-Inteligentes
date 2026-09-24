# Intelligent Systems · UCLM

An English-language teaching campus for **Universidad de Castilla-La Mancha**, with six complete units, 335 presentation slides, 28 interactive laboratories and 36 formative self-check questions.

**[Enter the published campus](https://rubences.github.io/Sistemas-Inteligentes/).** The course is in English, with a bilingual glossary. You can also download the repository as a ZIP and open `index.html` for offline reading and standalone simulations. Use HTTP(S) for integrated study/laboratory layout and browser Python; Python downloads its runtime from a CDN. Live class requires the separate service described below.

## Start teaching

1. Open the campus and choose **Teach a session**.
2. Select a unit and use its suggested 80-minute launch agenda.
3. Open an integrated laboratory: the simulation and evidence form share one workspace.
4. Ask students to predict, experiment and explain. Notes save automatically in that browser.
5. Finish with a self-check and an implementation task.

The suggested sessions are launch activities, not a promise to cover a whole unit in 80 minutes. Plan additional sessions for the full slide deck, programming and project work. See the [instructor guide](docs/INSTRUCTOR_GUIDE.md) and [student guide](docs/STUDENT_GUIDE.md).

## Course map

| Unit | Topic | Slides | Labs | Teaching materials |
|---|---|---:|---:|---|
| 1 | Intelligent agents | 48 | 4 | [Interactive](materials/lectures/UCLM_Unit1_Intelligent_Agents_EN.html) · [PDF](materials/pdf/UCLM_Unit1_Intelligent_Agents_EN.pdf) |
| 2 | Problem solving and search | 53 | 4 | [Interactive](materials/lectures/UCLM_Unit2_Problem_Solving_Search_EN.html) · [PDF](materials/pdf/UCLM_Unit2_Problem_Solving_Search_EN.pdf) |
| 3 | Informed search | 60 | 5 | [Interactive](materials/lectures/UCLM_Unit3_Informed_Search_EN.html) · [PDF](materials/pdf/UCLM_Unit3_Informed_Search_EN.pdf) |
| 4 | Constraint satisfaction | 54 | 5 | [Interactive](materials/lectures/UCLM_Unit4_Constraint_Satisfaction_EN.html) · [PDF](materials/pdf/UCLM_Unit4_Constraint_Satisfaction_EN.pdf) |
| 5 | Adversarial search | 60 | 5 | [Interactive](materials/lectures/UCLM_Unit5_Adversarial_Search_EN.html) · [PDF](materials/pdf/UCLM_Unit5_Adversarial_Search_EN.pdf) |
| 6 | Reinforcement learning | 60 | 5 | [Interactive](materials/lectures/UCLM_Unit6_Reinforcement_Learning_EN.html) · [PDF](materials/pdf/UCLM_Unit6_Reinforcement_Learning_EN.pdf) |

GitHub's file viewer shows HTML source. Use the published campus to run the interactive materials.

## Learning workspace

- **Integrated laboratories:** all 28 simulations beside prediction, experiment and autosaved evidence.
- **Browser Python:** six editable exercises, public checks, hints, worked examples, cancellation and a ten-second execution limit.
- **Challenge paths:** 18 foundation/applied/extension briefs with suggested criteria.
- **Comparisons:** shared graph search, minimax/alpha–beta and seeded Q-learning/SARSA experiments with downloadable settings/results.
- **Study and review:** 335 searchable slides, paired explanations, 40 bilingual glossary terms and concept-based revisit recommendations.
- **Planning:** 15 suggested teaching weeks, editable CSV and 36-question Moodle XML export.
- **Live class:** optional shared polls, submissions, receipts, feedback and protected teacher records through the [classroom service](server/README.md).

See [Moodle integration](integration/README.md) and [assignment briefs](integration/assignment-briefs.md). The live service is implemented separately; GitHub Pages alone cannot host it.

## Serve locally (optional)

Requires Python 3:

```sh
python -m http.server 8000
```

Open **http://localhost:8000**. Use the same address and port on later visits to retain the same browser progress. The site uses relative paths and also works under a GitHub Pages repository subpath.

## Publish on GitHub Pages

In this repository, open **Settings → Pages → Build and deployment**, select **Deploy from a branch**, then **main** and **/(root)**, and save. GitHub will display the published URL after deployment. The included `.nojekyll` makes this a plain static site. See [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Programming and project

- [Six Python exercises](docs/PRACTICE.md): starter, reference and shared behavioural tests.
- [Geared Loopover project](docs/CAPSTONE.md): immutable Java board, coupled transitions, bounded BFS and an A* extension.
- [Six evidence worksheets](practice/worksheets/): prediction, experiment and explanation.

```sh
node --test tests/*.test.cjs
python scripts/check_materials.py
python scripts/check_learning.py
python -m unittest discover -s server -v
python -m unittest discover -s practice/python -v
cd practice/java
javac *.java
java -ea LoopoverTest
java Loopover
```

Python 3.10+, Node 20+ and JDK 17+ are needed only for these development checks. Reading and simulations have no external runtime dependencies. Browser Python uses Pyodide 314.0.7 from jsDelivr, in an isolated worker. `python practice/python/check_student.py` intentionally fails until the starter is completed; reference tests run in CI.

## Repository structure

| Path | Purpose |
|---|---|
| `index.html`, `assets/` | Responsive campus, metadata, local progress, quizzes and class timer |
| `materials/lectures/` | Six self-contained HTML presentations with simulations and notes |
| `materials/pdf/` | Study and print editions |
| `materials/originals/` | Six supplied source presentations |
| `practice/` | Worksheets, Python exercises and Java project |
| `docs/` | Student, instructor, practice and project guides |
| `runner/` | Isolated browser Python runtime |
| `server/` | Optional authenticated classroom service and deployment instructions |
| `integration/` | Moodle XML, assignment briefs and teaching-plan CSV |
| `authoring/` | Editable lecture content and portable rebuild script |
| `tests/`, `scripts/`, `.github/workflows/` | Progress, content and algorithm checks |

## Progress and assessment

Personal course progress is **self-reported and stored in the browser**: notes, code, challenge evidence and quiz answers. Export/import a JSON backup from Resources; older backups remain compatible. Concept recommendations use the latest recorded answers, not a mastery claim. Live class sends only explicitly submitted evidence, pseudonyms and votes to the configured service. Its receipts and feedback are formative; use Moodle for verified identities and official grades. Quiz answers and reference implementations are public learning materials.

Content and proposed assessment weights require the instructor's academic approval before they become official course policy. See [attribution](ATTRIBUTION.md) and [editing instructions](authoring/README.md).
