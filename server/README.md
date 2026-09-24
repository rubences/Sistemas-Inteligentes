# Optional classroom service

This is a separate Python/SQLite service for real shared rooms, polls, evidence submissions, receipts and teacher feedback. GitHub Pages hosts the campus client but **cannot execute this service**. Deploy it to an HTTPS server you control before using Live class with a group.

## Local verification

Python 3.12 or newer is recommended; no third-party Python dependency is required.

```bash
python -m unittest discover -s server -v
export CLASSROOM_TEACHER_KEY="$(python -c 'import secrets; print(secrets.token_urlsafe(48))')"
export CLASSROOM_ORIGINS=http://localhost:8765
export CLASSROOM_DB=/tmp/uclm-classroom-development/class.db
python server/app.py
```

In another terminal, serve the campus with `python -m http.server 8765`, open `http://localhost:8765/#live` and set the service URL to `http://localhost:8787`. Use the generated environment value as the teacher key. Create a room, then join from a separate browser with its invite code and a pseudonym. The service must stay running. Use localhost consistently; CORS origins match exactly.

## Deployment

1. Provision an HTTPS domain and a host that can run Python or Docker. Keep the database on a persistent disk, outside any static web directory. The default `/tmp` path is for development only.
2. Generate a random teacher key of at least 32 characters and put it in your host's secret configuration. Never commit it, paste it into an issue or include it in a course export. There is one course-owner key; it is not an institutional login system.
3. Set `CLASSROOM_ORIGINS=https://rubences.github.io` (no project path). Separate additional exact origins with commas. Set `CLASSROOM_DB` to your persistent database path and optionally `CLASSROOM_PRIVATE_DIR` to a directory outside this public repository containing protected `.md` marking guides. The supplied public worked examples are deliberately available to learners.
4. Bind the service to localhost and put your HTTPS reverse proxy in front of port 8787. Forward the `/api/` requests unchanged, cap request bodies at 400 KB and configure a connection/request limit appropriate to the class. Do not expose port 8787 directly on the public network. With Docker, set `CLASSROOM_TEACHER_KEY` and `CLASSROOM_PRIVATE_PATH` to an external directory readable by UID 10001, then run `docker compose -f server/compose.yaml up -d --build`. The named volume persists SQLite data.
5. Check `https://YOUR-SERVICE-DOMAIN/api/health` returns `{"status":"ok","version":1}`. Enter that service origin on the campus Live class page and run the complete teacher/student trial below.
6. Back up the database while the service is stopped, or use SQLite's online backup API. Test restoration with the same teacher key. Decide a retention period for class records; archiving closes a room but does not erase its records. Delete expired records through an administrator-controlled database maintenance process, with the service stopped and a backup taken.

Example reverse proxy configuration for Caddy (replace the domain and manage DNS/TLS on your host):

```caddyfile
classroom.your-university.example {
    request_body {
        max_size 400KB
    }
    reverse_proxy 127.0.0.1:8787
}
```

## Acceptance trial

Connect as teacher → create room → copy invite code → join as a student in a separate browser → create poll → vote twice and verify the second answer replaces the first → close poll → verify totals → submit a reviewed evidence preview → record the receipt → add teacher feedback → verify it appears in the student's view → export CSV → archive the room. Reload the student page and resume its session. Restart the service and verify the records persist.

The client refreshes every ten seconds while the route is open. Edited evidence drafts are retained in session storage per service, room and pseudonym; download a draft for a durable copy. Connection attempts are serialized and cancelled on navigation, and authentication requests are bound to their selected service. Student tokens are room-scoped and stored in session storage; the teacher key stays in memory and is cleared on navigation/reload/disconnect. Votes are limited to one current choice per participant token. A pseudonym and invite code are not verified identities; use Moodle for official assessed submissions. Room codes permit new joins for 48 hours. Limits are 150 participants, 1,500 submissions per room and 50 active rooms. Polls have 2–6 choices. Submissions allow 60,000 characters and feedback 5,000. The service rate-limits known tokens separately so participants behind campus NAT do not share a single request bucket.

Only the configured campus origin is allowed in browser CORS. Teacher records and private marking files require the secret key; participant tokens cannot access them. The service stores a hash of each student token and never runs submitted code. Hosting administrators can access the database; explain this and the retention arrangements to your students. Treat the service as a small single-course deployment behind a managed HTTPS proxy, not an institutional identity or grading platform.

The test suite covers authentication, CORS, room isolation, votes, invalid inputs, idempotent receipts, feedback and database restart. It does not provision a remote host or certify an institution's deployment.
