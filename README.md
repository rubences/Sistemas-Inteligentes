# Intelligent Systems · UCLM

An English-language teaching campus for **Universidad de Castilla-La Mancha**, with six complete units, 335 presentation slides, 28 interactive laboratories and 36 formative self-check questions.

**Open `index.html` in your browser to enter the classroom.** Download the repository as a ZIP and extract it first. No installation, account, server or internet connection is needed for the campus and simulations. For a consistent browser storage origin, use the optional local server below.

## Start teaching

1. Open the campus and choose **Teach a session**.
2. Select a unit and use its suggested 80-minute launch agenda.
3. Open the presentation or a laboratory in a separate tab.
4. Ask students to predict, experiment and explain the evidence using the worksheet.
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

GitHub's file viewer shows HTML source. Use a downloaded copy or enable GitHub Pages to run the interactive materials.

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
python -m unittest discover -s practice/python -v
cd practice/java
javac *.java
java -ea LoopoverTest
java Loopover
```

Python 3.10+, Node 20+ and JDK 17+ are needed only for these development checks. The browser campus has no runtime dependencies. `python practice/python/check_student.py` intentionally fails until the starter is completed; reference tests run in CI.

## Repository structure

| Path | Purpose |
|---|---|
| `index.html`, `assets/` | Responsive campus, metadata, local progress, quizzes and class timer |
| `materials/lectures/` | Six self-contained HTML presentations with simulations and notes |
| `materials/pdf/` | Study and print editions |
| `materials/originals/` | Six supplied source presentations |
| `practice/` | Worksheets, Python exercises and Java project |
| `docs/` | Student, instructor, practice and project guides |
| `authoring/` | Editable lecture content and portable rebuild script |
| `tests/`, `scripts/`, `.github/workflows/` | Progress, content and algorithm checks |

## Progress and assessment

Progress is **self-reported and stored only in the browser**. Export/import a JSON backup from Resources. It is not an LMS, gradebook, authentication system or assignment-submission service. Quiz answers and reference implementations are public learning materials. Use the institution's approved platform for formal submissions and grades.

Content and proposed assessment weights require the instructor's academic approval before they become official course policy. See [attribution](ATTRIBUTION.md) and [editing instructions](authoring/README.md).
