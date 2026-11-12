# Short validation notes

Current scope: Home, shared login, three separate role registration forms, four dashboard layouts, and temporary in-page accounts. Other features are not implemented.

## Essential checks

- Open `index.html` directly and follow all four role login links.
- Use each sample account and confirm the correct dashboard destination.
- Submit blank/invalid forms and check field messages.
- Select Student, Faculty Advisor, and Academic Coordinator: confirm each prompt and link opens only its matching registration form and theme.
- Select Administrator: hide public registration links and explain institutional account assignment. No selection shows a role-selection hint.
- Register fictional details in each form, use Go to login without refreshing, and enter the registered password for that role.
- Check Advisor faculty ID/department/designation and Coordinator ID/department/term/consecutive academic year as well as their password confirmations.
- Reject a wrong password, wrong role, duplicate ID/email across registration roles, reserved sample email, or mismatched confirmation.
- Reset a form and confirm its values/messages/password visibility reset correctly.
- Refresh or leave Login.html: the temporary registration is cleared; sample accounts remain available.
- Check local file/fragment links and JavaScript syntax.

The current role-registration update passed 36 grouped behavior checks using a lightweight DOM fixture and 19 static groups. Coverage includes all three registration flows and their matching dashboard logins, dynamic prompts, the Administrator registration guard, field/duplicate rules, reset, all four sample accounts, entry-page links, labels/IDs, and all six JavaScript files' syntax. Go to login was also checked after registering multiple roles: each form prefills its own role's account. These are development checks, not real-browser verification.

Role colors were also checked for URL selection, dropdown changes, registration, returning to login, and reset. All four role colors have at least 4.5:1 contrast with white button/menu text. The logo file and local image references were checked.

Real-browser layout and native event behavior have not been verified: the managed environment does not expose its required `cua_repl.js` tool. No browser pass is claimed.
