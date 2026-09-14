# Daily hours cache reset

Hours are cached across requests. Saving or deleting an hours entry invalidates
the `hours` cache tag. A daily scheduler must also invalidate it so cached pages
recalculate which hours apply to the new date.

## Plesk Linux setup

Deploy the application changes first. Set a strong `CRON_SECRET` in the
application's production environment and restart the app if it changed.

In Plesk, open **Websites & Domains > Scheduled Tasks > Add Task**:

1. Choose **Run a command**.
2. Enter the following command, replacing the domain and secret placeholders:

   ```sh
   curl --fail --silent --show-error --max-time 60 --retry 2 --header 'Authorization: Bearer REPLACE_WITH_CRON_SECRET' 'https://YOUR_DOMAIN/next/revalidate-hours'
   ```

3. Select **Daily**, at **00:05** in the server's Mountain timezone. If using
   cron-style scheduling, enter `5 0 * * *` in the schedule field.
4. Enable the task, select notifications for errors, and save it.
5. Use **Run Now** to verify it returns `{"revalidated":true}`.

Use the site's final HTTPS domain to avoid redirects. The secret in the command
must match the app's `CRON_SECRET`; do not commit the actual command containing
the production secret. A 401 response means the secret is missing or incorrect.

Plesk subscription tasks may use a chrooted shell. If `curl` is unavailable to
the task, the server administrator must make it available in that shell.

See [Plesk's scheduled tasks documentation](https://docs.plesk.com/en-US/obsidian/administrator-guide/server-administration/scheduling-tasks.64993/).

The endpoint invalidates the hours data and cached pages that consume it. They
regenerate on their next request; already-open browser tabs do not refresh
automatically. A successful reset returns `{"revalidated":true}`.

The schedule must be configured in Plesk; the endpoint alone does not run a
daily task. The selected time is just after midnight; minute-level precision is
not required.
