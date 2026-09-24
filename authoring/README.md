# Editing and rebuilding the course

The editable lecture sources are `unit1-content.json` through `unit6-content.json`, with shared CSS, navigation JavaScript and per-unit simulations. Each slide stores its chapter, title, body, notes, class, subtitle and reference. The body is trusted course-author HTML, not student input.

## Rebuild without overwriting the published edition

From the repository root, with Python 3.10+:

```sh
python authoring/build.py
```

The six self-contained HTML files are written into `.artifacts/rebuilt/`. The script embeds the local fonts, cover images, CSS and JavaScript; no network downloads or Python packages are required. Use `--output PATH` to choose another directory.

Open the rebuilt files and inspect navigation, notes, every changed slide and its controls. Check desktop, a narrow viewport and print preview. The supplied PDFs remain the canonical study editions until you deliberately replace them after reviewing the corresponding new HTML. Browser Print can produce replacement PDFs using the presentation's print stylesheet.

## Accept a revised edition

Copy only reviewed files into `materials/lectures/` and replace corresponding PDFs. Update slide counts, laboratory anchors, quiz explanations and worksheet links in `assets/course-data.js` if the teaching structure changed. Update `materials/manifest.json` with the new SHA-256 and byte count; do not update it just to silence an unexpected integrity failure.

```sh
python scripts/check_materials.py
node --test tests/*.test.cjs
python -m unittest discover -s practice/python -v
```

## Editing the campus

- `assets/course-data.js`: units, outcomes, laboratory prompts, quiz questions and session agendas.
- `assets/app.js`: views and interaction logic.
- `assets/progress.js`: import validation, scoring and timer logic.
- `assets/campus.css`: responsive visual design and print layout.

Maintain relative URLs so the same files work offline and under a GitHub Pages project path. Student notes must remain plain text. No API key or secret belongs in this static repository.

## Optional browser regression check

Install Playwright in a development environment (`npm install --no-save playwright`, then `npx playwright install chromium`) and run `node scripts/browser_check.cjs`. The check exercises the campus, all laboratory anchors, Unicode backup round trips, responsive layout and offline loading. Set `CAMPUS_URL` to a served `index.html` URL to check a deployment path; by default it opens the local file. Screenshots go to `.artifacts/`.
