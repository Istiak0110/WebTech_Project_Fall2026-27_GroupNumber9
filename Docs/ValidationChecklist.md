# Short validation notes

Current scope: Home, two entry forms, four dashboard layouts, and temporary in-page registration. Other features are not implemented.

## Essential checks

- Open `index.html` directly and follow all four role login links.
- Use each sample account and confirm the correct dashboard destination.
- Submit blank/invalid forms and check field messages.
- Register fictional details, use Go to login without refreshing, choose Student, and enter the registered password.
- Reject a wrong password, wrong role, duplicate ID/email, or mismatched confirmation.
- Reset a form and confirm its values/messages/password visibility reset correctly.
- Refresh or leave Login.html: the temporary registration is cleared; sample accounts remain available.
- Check local file/fragment links and JavaScript syntax.

The rebuilt draft passed essential JavaScript checks using a lightweight DOM fixture: four sample roles, same-page registration followed by login from a file context, invalid fields, duplicate records, form feedback/reset, and a fresh page clearing temporary accounts. Local links, IDs, label/error references, and JavaScript syntax also passed. These are development checks, not real-browser verification.

Role colors were also checked for URL selection, dropdown changes, registration, returning to login, and reset. All four role colors have at least 4.5:1 contrast with white button/menu text. The logo file and local image references were checked.

Real-browser layout and native event behavior have not been verified: the managed environment does not expose its required `cua_repl.js` tool. No browser pass is claimed.
