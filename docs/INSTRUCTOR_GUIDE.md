# Instructor guide

## Before the first session

Download and extract the repository, open `index.html`, and test the chosen laboratory on the classroom computer. The materials work offline. A local server (`python -m http.server 8000`) provides a stable browser origin. Keep the PDF available as a projection fallback.

Review the unit's notes and the worksheet in advance. Confirm the official syllabus, schedule, accessibility arrangements and assessment policy separately. The six supplied presentations are retained in `materials/originals/`; the English HTML/PDF editions add explanation and interactive examples.

## Suggested 80-minute launch routine

| Phase | Minutes | Teaching move | Evidence to request |
|---|---:|---|---|
| Retrieve and predict | 10 | Ask a diagnostic question before revealing the result | Individual prediction and reason |
| Build the model | 20 | Define states, objective, assumptions and algorithm | A precise contract or diagram |
| Experiment | 20 | Run the first laboratory; vary one parameter | Controlled comparison |
| Evidence challenge | 20 | Use a second case or the final laboratory in the unit | Counterexample, boundary case or explanation |
| Explain and check | 10 | Invite a short defence and a self-check | What changed in the student's understanding |

**Teach a session** provides a unit-specific agenda, slide links and timer. The timer is a pacing aid. Changing phase or unit resets it. A full unit needs additional sessions for the remaining slides, programming exercises and project integration.

## Discussion prompts by unit

| Unit | Question that exposes understanding | Common misconception |
|---|---|---|
| Agents | What information is available when the action is chosen? | Rational means omniscient |
| Search | When is the goal tested, and what is in the frontier? | Fewest edges always means cheapest path |
| Informed search | What justifies this lower bound? | Admissible implies consistent |
| CSP | What did propagation remove, and what did it not prove? | Arc consistency proves global satisfiability |
| Games | Which node values are exact and which are bounds? | A pruned value is necessarily exact |
| RL | What is the target, and should this transition bootstrap? | A time limit always means a terminal state |

Ask for a concrete counterexample when students state a guarantee without its assumptions.

## Use the materials actively

A 60-slide deck is a resource, not an instruction to lecture continuously. Select a short path through the index, alternate explanation with prediction and experiment, and use the notes to prepare discussion. Set a visible purpose for each simulation. Have pairs swap operator and observer roles.

Use the Python reference only after students have attempted the contract. Public tests are formative; supplement them with an unseen case and a short oral explanation if the work contributes to assessment. The Java project provides a correct model and bounded baseline; students implement and justify the heuristic search extension.

## Assessment and feedback

The project rubric in [CAPSTONE.md](CAPSTONE.md) is a proposal, not an official grade scheme. Give feedback on model accuracy, algorithm assumptions, controlled experiments and clarity of conclusions. Self-checks are public practice questions and local scores can be edited by the learner; they are unsuitable as trusted grades.

There is no server, login, attendance tracker or submission endpoint. Use UCLM's approved teaching platform for submissions and official records. The campus can be linked from that platform, while its simulations remain independently usable.

## Maintenance

Edit unit metadata and quiz explanations in `assets/course-data.js`. Edit presentation sources using [the authoring guide](../authoring/README.md). Run the repository checks before publishing. Replace PDFs after changing their HTML source so students do not study contradictory versions. Update the manifest deliberately when accepting a new canonical edition.
