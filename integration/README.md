# Moodle and teaching integration

The static campus and Moodle can be used together without a custom plugin or student credentials in this repository.

1. Open the course question bank in Moodle and choose **Import → Moodle XML format**.
2. Upload [moodle-questions.xml](moodle-questions.xml). Import the included categories if you want one category per unit. Check the preview: 36 single-answer questions across six units.
3. Create a formative quiz from those categories. Set feedback visibility and attempts to match your teaching plan. These questions and answers are public practice material; do not reuse them as a confidential examination bank.
4. Create an **Assignment**, enable file submissions, and paste a brief from [assignment-briefs.md](assignment-briefs.md). Copy its four criteria into Moodle's rubric or marking guide and confirm the official weights and deadline.
5. Ask students to upload their campus evidence report, relevant `.py`/Java source and reproducibility data. Moodle supplies institutional identities, deadlines and official feedback. Campus self-check scores and browser execution are formative, not authenticated grades.
6. Use [teaching-plan.csv](teaching-plan.csv) as an editable 15-week planning table. It is a proposed sequence, not the official UCLM calendar or an automatic Moodle calendar import.

The optional [classroom service](../server/README.md) supports live polls, evidence receipts and feedback using pseudonyms. It is separate from Moodle. No LTI, SSO, gradebook synchronization or automatic identity verification is claimed.

Regenerate these exports after changing the source: `python scripts/build_learning_data.py` then `python scripts/build_integration.py`.

Documentation: [Moodle question import](https://docs.moodle.org/502/en/Import_questions) and [assignment settings](https://docs.moodle.org/502/en/Assignment_settings).
