# Intelligent Systems teaching campus

## Purpose

Turn the six English UCLM units into a usable teaching repository for Rubén Juárez Cádiz. Students must be able to study, launch the actual simulations, test their understanding and produce evidence from programming activities. The teacher needs an immediately usable session launcher and a documented course sequence.

## Architecture

A static HTML/CSS/JavaScript campus at the repository root, with no production dependencies. Course metadata is in `assets/course-data.js`; rendering and interactions in `assets/app.js`; local progress validation in `assets/progress.js`. All presentation HTML files and PDFs are preserved byte for byte. The original PowerPoints and editable authoring sources are included separately.

The campus runs by opening `index.html`, through `python -m http.server`, or on GitHub Pages from `main / (root)`. It uses relative URLs and no runtime network requests. External source links and GitHub downloads naturally require a connection. A downloaded repository contains everything needed for the local experience.

## Experience

- A course home with six units, clear outcomes and a suggested next step.
- A unit page with presentation, PDF, original deck, outcome checklist, practical work and a six-question formative quiz.
- A searchable catalogue of 28 existing interactive laboratories, each with a prediction question and an evidence task.
- A classroom view with a suggested 80-minute agenda and a timer. The proposed sequence is guidance, not an official university timetable.
- A practice area with six Python exercises, reference implementations and meaningful tests. A geared Loopover Java project preserves the actual row-then-column action convention.
- A capstone brief with deliverables, reproducibility requirements and a suggested rubric, explicitly separate from official assessment rules.
- Browser-local progress, import/export and clear explanation that this is personal practice, not an LMS or official gradebook. Progress is marked explicitly; merely opening a unit never counts as completion.

## Constraints

English learning content and controls. UCLM ivory, charcoal and crimson design. Responsive layout, keyboard operation, semantic controls, visible focus and reduced-motion support. No student accounts, tracking, remote score storage or invented course deadlines. No unrelated repository content or secrets.

## Verification

Validate all local URLs and all slide anchors. Compare copied materials against SHA-256 checksums. Test scoring, progress validation, malformed imports and timer state. Run Python algorithm tests and Java transition contracts. Exercise every campus route and all 28 lab links in Chromium, on desktop and mobile, with the network disabled. Read the final repository diff before writing the reviewed commit to GitHub.
