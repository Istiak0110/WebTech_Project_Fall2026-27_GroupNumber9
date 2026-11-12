# Milestone 1 validation checklist

Only home navigation, demo login, student registration, temporary profiles, and four dashboard shells belong to this milestone. Other academic features remain planned.

## Recorded verification status

| Check category | Status | Evidence |
|---|---|---|
| HTML structure and local asset/link checks | Passed | 22/22 static check groups passed across all seven HTML pages, including local assets, links, fragments, IDs, labels, and error references. |
| JavaScript syntax checks | Passed | All 10 JavaScript files passed `node --check`. Node was used only as a development check; the application requires no Node runtime. |
| Form and storage behavior checks | Passed in a DOM simulation | Independent JavaScript VM run: 42/42 behavior and HTML-integration groups passed. See the scope below. |
| Browser navigation and visual review | Not performed | The managed environment did not expose its required `cua_repl.js` browser-control tool. No alternative browser route was used. |
| Final source/file review | Passed | Reviewed 25 source/documentation files; source-only ZIP integrity passed. Git metadata, uploaded faculty examples, scratch files, dependencies, and private credentials are excluded. |

Do not change a status to Passed until that check has run successfully. A syntax check does not prove form behavior; a DOM simulation does not prove visual layout in a browser.

The 42 passing groups cover all four role destinations, empty and invalid login fields, credential mismatch, query-role allowlisting, demo account filling, password visibility, registration boundaries and duplicates, optional phone, password rules, correction/reset feedback, profiles without passwords, same-storage page transitions, blocked/quota/corrupt storage fallback, scoped reset, and dashboard initialization. They also load each page's actual scripts in HTML order, check inline handler names, and verify that page initialization enables the initially disabled form fieldsets. The check used Node's JavaScript VM with lightweight DOM and storage fixtures outside the application source. It did not test real-browser event propagation, rendering, the accessibility tree, responsive layout, native reset ordering, or `file://` storage behavior. The detailed scenarios below remain a manual/browser review guide where not covered by that simulation.

## Login scenarios

- Submit an empty form: all applicable errors appear, no navigation occurs, and focus moves to the first invalid field.
- Choose each of Student, Administrator, Faculty Advisor, and Academic Coordinator and use its published account: the destination is the correct dashboard.
- Enter a malformed email, a whitespace-only value, an empty password, and the wrong password.
- Use a valid account with the wrong selected role: reject the mismatch.
- Check email comparison behavior for surrounding whitespace and letter case.
- Enter a valid `?role=` URL value: preselect only that known role. An unknown value must not select an arbitrary route.
- Try the demo-account fill control with and without a selected role.
- Show/hide the password without changing its value.
- Correct invalid fields: stale error/result messages clear appropriately.
- Reset: values, errors, result text, and show-password state return to the documented defaults.

## Student registration scenarios

- Submit empty and whitespace-only fields: show all required-field errors together; the optional blank phone remains valid.
- Check name boundaries at 2, 3, 60, and 61 characters, ordinary apostrophes/hyphens/dots, digits, and punctuation-only input.
- Check valid ID `26-12346-3`; reject missing hyphens, wrong digit counts, and final semester digit outside 1–3.
- Reject seed ID `26-12345-3` and seed email `student@studybuddy.example`; reject a second temporary profile with the same ID/email, including case changes in email.
- Check a malformed email and an email with surrounding whitespace.
- Accept a blank phone and valid `01712345678`; reject a wrong prefix, too few/many digits, and letters.
- Require one of the known programs and a semester from 1–12. Changing a control's value programmatically must not bypass the allowlist.
- Check password length below/at 8, missing uppercase, missing lowercase, missing digit, empty confirmation, and mismatched confirmation.
- Submit a valid fictional profile: show an accurate success message and Continue to Login, with no real-account claim.
- Inspect the saved profile: no password or confirmation is present.
- Change a field after success: hide stale success/Continue to Login as appropriate, and validate again on submission.
- Reset: clear errors/result/continue state and restore any shown password fields to hidden.

## Temporary-data scenarios

- With working `sessionStorage`, register a profile and check duplicate detection after navigating within the same tab and origin.
- Switch demo roles: temporary profiles remain until Reset Demo.
- Reset Demo: remove StudyBuddy's profile key and restore seed-record behavior; leave an unrelated storage key untouched.
- Block storage or simulate a quota failure: show the in-memory/current-page limitation without claiming a cross-page save.
- Supply malformed stored JSON or an invalid data shape: recover safely without a script crash.
- Render text containing HTML-like characters safely as text, never executable markup.

## Navigation, layout, and scope

- Check Home → Login → each dashboard, dashboard → Home, and Switch Role.
- Check Student Registration → Login.
- Verify every local stylesheet, script, image, link, and fragment target exists.
- Confirm each dashboard has a distinct role heading and active navigation state.
- Confirm future-feature cards are labeled Planned and open existing local roadmap sections.
- Check keyboard focus visibility, associated labels/errors, readable success/error text, and form submission with Enter.
- Review narrow/mobile and desktop layouts for clipped content or horizontal page overflow.
- Record browser-console errors and resolve errors caused by this milestone.
- Confirm no backend/framework files or third-party runtime services are required.

## Later milestone checks

Academic calculations, prerequisites, credit limits, timetable collision handling, record editing, and advising workflow are not tested in this milestone because they are not implemented. Add their actual results when their modules are built.
