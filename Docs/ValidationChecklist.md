# Milestone 1 validation checklist

Only home navigation, sample and registered Student demo login, student registration, temporary profiles, and four dashboard shells belong to this milestone. Other academic features remain planned.

## Recorded verification status

| Check category | Status | Evidence |
|---|---|---|
| HTML structure and local asset/link checks | Passed | 22/22 current static groups passed across the seven HTML pages, including links, fragments, IDs, labels, script paths, and form/error references. |
| JavaScript syntax checks | Passed | All 10 JavaScript files passed `node --check` as part of the static checks. Node is only a development check; the application requires no Node runtime. |
| Form and storage behavior checks | Passed in a DOM simulation | 71/71 current behavior/integration groups passed, including asynchronous registration and registered Student login. |
| Browser navigation and visual review | Not performed | The managed environment did not expose its required `cua_repl.js` browser-control tool. No alternative browser route was used. |
| Final source/file review | Passed | Reviewed the updated source and documentation together: 25 project files, source-only ZIP integrity passed. Git metadata, uploaded faculty examples, scratch files, dependencies, and private credentials are excluded. |

Do not change a status to Passed until that check has run successfully. A syntax check does not prove form behavior; a DOM simulation does not prove visual layout in a browser.

The current run passed 22 static groups and 71 behavior/integration groups. The asynchronous checks use Node's native Web Crypto in a JavaScript VM with lightweight DOM/storage fixtures. They cover genuine SHA-256 output; registration followed by login across page contexts; correct/wrong passwords and roles; unchanged public sample accounts; field and duplicate rules; blocked/quota/corrupt storage; missing browser APIs and failed digest preparation; legacy profiles and verifier validation; reset scope; and cancellation of pending results after edits, Reset, or another submission. The actual HTML script order and named handlers are included.

These fixtures do not prove real-browser event propagation, rendering, the accessibility tree, responsive layout, native reset ordering, or actual `file://` storage behavior. The file-origin rejection branches were exercised in the fixtures; the browser-specific properties remain unverified. The scenarios below are also a manual/browser review guide.

## Register and use your own Student login

1. Open the project folder in VS Code and use Live Server, or another static preview, to open `index.html`. Keep the same browser tab and site address throughout this test.
2. Open Student Registration and enter fictional details with an unused ID/email, such as `26-54321-3` and `amina@studybuddy.example`. Choose a program and semester.
3. Enter and confirm `StudyBuddy2`, then submit. Wait for success and Continue to Login. The account must not be reported ready while preparation is still pending.
4. Follow Continue to Login in the same tab. Choose **Student** and type the registered email and password. The **Fill selected role's account** control is for built-in sample accounts and replaces the entered credentials.
5. Submit the correct password: the Student dashboard opens. Return to Login and try a different password: show an error and remain on Login.
6. Select Administrator, Faculty Advisor, or Academic Coordinator with the registered email: explain that registered demo accounts use Student.
7. Return to Login and try the registered email with different letter case or surrounding spaces: compare its normalized form; keep password comparison exact.
8. Reset demo profiles on Home, then retry the registered account: it no longer exists. The four public sample accounts must still work.
9. Test a profile made with the older draft: explain that it has no verifier and direct the user to Home → Reset Demo Profiles → register again. Do not claim the previous profile can already log in.
10. Open the files directly at a `file://` address: sample accounts still work; registration explains how to use a static preview and creates no new login.

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
- Reject seed ID `26-12345-3` and all four public sample email addresses; reject a second temporary profile with the same ID/email, including case changes in email.
- Check a malformed email and an email with surrounding whitespace.
- Accept a blank phone and valid `01712345678`; reject a wrong prefix, too few/many digits, and letters.
- Require one of the known programs and a semester from 1–12. Changing a control's value programmatically must not bypass the allowlist.
- Check password length below/at 8, missing uppercase, missing lowercase, missing digit, empty confirmation, and mismatched confirmation.
- Submit a valid fictional profile through a static preview: show success and Continue to Login only after the verifier and storage write succeed, with no real-account claim.
- Inspect the saved profile: no raw password or confirmation is present; `passwordHash` is a 64-character lowercase hexadecimal verifier.
- Change a field after success: hide stale success/Continue to Login as appropriate, and validate again on submission.
- Reset: clear errors/result/continue state and restore any shown password fields to hidden.

## Temporary-data scenarios

- With working `sessionStorage`, register a profile and check duplicate detection after navigating within the same tab and origin.
- Switch demo roles: temporary profiles remain until Reset Demo.
- Reset Demo: remove StudyBuddy's profile key and restore seed-record behavior; leave an unrelated storage key untouched.
- Block reads/writes or simulate a quota failure: report that no new demo login was created, keep Continue to Login hidden, and do not add a phantom page-memory account.
- Supply malformed stored JSON or an invalid data shape: recover safely without a script crash.
- Remove Web Crypto/TextEncoder support or reject the native digest Promise: explain the browser/static-preview requirement, create no new login, and retain sample-account access.
- Delay password preparation, then edit a field, Reset, fill a sample account, or submit again: old callbacks must not save stale profiles, show stale results, or redirect after cancellation.
- Try a stored profile with a missing verifier: retain the explicit older-draft recovery instructions. Reject malformed verifier values when reading storage.
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
