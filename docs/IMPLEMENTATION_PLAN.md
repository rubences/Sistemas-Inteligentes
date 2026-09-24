# Teaching campus implementation plan

Goal: a complete English teaching repository built around the six verified units.

Spec: `docs/DESIGN.md`. Execution: implement in the isolated feature branch and verify before the authorized repository update.

## 1. Course material and metadata

- [x] Copy the 12 verified final materials and six original source decks.
- [x] Record checksums and preserve portable authoring assets.
- [x] Define six unit records, 28 real lab anchors and 36 formative questions.
- [x] Validate every referenced slide and local file.

## 2. Campus and learner state

- [x] Implement overview, unit, labs, practice, classroom, capstone and resources routes.
- [x] Add search, unit filters, quiz feedback, explicit progress, export/import and timer controls.
- [x] Test corrupted storage, invalid imports, duplicate quiz attempts, navigation and keyboard use.

## 3. Practical teaching package

- [x] Create six Python exercises and tested reference implementations.
- [x] Add Java Loopover state transitions, inverse construction and a bounded solver exercise.
- [x] Write student, instructor, assessment and publication guides.
- [x] Add portable lecture rebuilding and repository validation commands.

## 4. End-to-end validation and delivery

- [x] Run local content and algorithm checks.
- [x] Verify all routes and actual lab controls with Chromium, including a 390px viewport and offline mode.
- [x] Review changes and correct material issues.
- [ ] Upload only the reviewed repository tree through the GitHub connector, preserving the current base.
- [ ] Verify the remote commit and report the repository and publication state accurately.

## Review focus

1. Relative links must work beneath the GitHub project path and from downloaded files.
2. Progress imports must reject unknown identifiers and malformed values without overwriting existing progress.
3. Quiz answers must persist as practice results without creating misleading official grades.
4. A paused timer must not consume time; a background timer must catch up correctly.
5. A search budget must report cutoff rather than falsely claiming no solution.

## Verification record

- Node progress/scoring/timer contracts: 7 passed.
- Python reference contracts: 6 passed.
- Material integrity: all 12 hashes and 28 laboratory anchors validated.
- Portable authoring: six units rebuilt using the standard library.
- Browser verification: routes, mobile width, all lab controls, all quiz answers, notes, import/export, timer and offline loading passed.
- Fresh review: one backup-size issue found and corrected; a maximal Unicode record now imports.
- Mobile check exposed grid expansion around code blocks; panels now retain the viewport width.
- Java contracts are included in the GitHub Actions workflow; its run is the authoritative compiler/runtime check.
- Integration decision: the user requested uploading the course to this repository; publish the reviewed tree on its initially empty main branch using a fast-forward commit.
