# StudyBuddy

**Student Academic Planning and Course Recommendation System**

American International University-Bangladesh (AIUB)

Web Technologies, Fall 2026–27 · Group 9

StudyBuddy is a student project built with HTML, CSS, and vanilla JavaScript. It follows the role folders, shared stylesheet, shared validation helpers, and page-specific scripts demonstrated in the faculty's Hospital Management System examples.

## Current milestone

Milestone 1 establishes the foundation:

- Home page and navigation for four roles.
- One demo login form with role-specific dashboard destinations.
- Student registration with validation and a temporary Student demo login.
- Student, Administrator, Faculty Advisor, and Academic Coordinator dashboard shells.
- Shared styling, fictional demo accounts, and temporary registration profiles.

Dashboard feature cards describe planned work. Their local links open the corresponding roadmap sections; calculators, academic planning, management, advising, and scheduling are not implemented in this milestone. See [the full development plan](Docs/DevelopmentPlan.md).

## Open the project

To try the public sample accounts, open `index.html` in a browser. No application installation or build is required. Enable JavaScript to use forms and role navigation.

**To register and use your own temporary Student login, open the project through a static preview**, such as VS Code Live Server. Open the whole project folder in your editor, start its static preview at `index.html`, and use the browser address it provides. Stay in the same browser tab and site address for registration and login. This only serves the HTML, CSS, and JavaScript files; the application has no backend logic.

Double-clicking an HTML file opens a `file://` address. The sample accounts still work there, but creating a registered login is unavailable because direct files do not reliably share temporary accounts.

## Try your own Student login

1. Open `index.html` through the static preview and choose Student Registration.
2. Enter fictional details with an unused ID and email, for example `26-54321-3` and `amina@studybuddy.example`. Choose a program and semester.
3. Enter and confirm a password meeting the displayed rules, such as `StudyBuddy2`.
4. Submit and wait for the message that your temporary Student demo account is ready. If storage or the browser's password-check API fails, the page explains the issue and creates no new login.
5. Select Continue to Login in that same tab. Choose **Student**, then enter the email and password you registered. The **Fill selected role's account** button is for the public accounts below; it replaces your entered details with the selected sample account.

If you registered with the older draft that only saved a profile, use Reset Demo Profiles on the home page and register again. Older profiles have no password verifier, so they cannot be used for the new temporary login.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Student | `student@studybuddy.example` | `StudyBuddy1` |
| Administrator | `admin@studybuddy.example` | `StudyBuddy1` |
| Faculty Advisor | `advisor@studybuddy.example` | `StudyBuddy1` |
| Academic Coordinator | `coordinator@studybuddy.example` | `StudyBuddy1` |

These public credentials simulate navigation and remain available for all four roles. A newly registered demo login uses only the Student role. All four published sample email addresses are reserved and cannot be used for a new registration.

The entered registration password and confirmation are never saved. The browser uses its native SHA-256 API to create a comparison value, called `passwordHash`, and saves that verifier with the fictional profile in `sessionStorage`. Login compares the verifier for the entered password. This is a browser-local classroom demonstration, not secure authentication or access protection; dashboards can still be opened directly.

Registration succeeds only after the verifier is prepared and temporary storage accepts the profile. Blocked or failed storage does not create a page-only account. Temporary logins belong to the current tab and site address, are not permanently saved, and are not shared across devices. Reset Demo Profiles removes StudyBuddy's temporary profiles and restores the seed records; it does not clear unrelated browser storage.

## File organization

| Location | Purpose |
|---|---|
| `index.html`, `Login.html` | Public entry pages. |
| `Design/Style.css` | Shared, responsive styles. |
| `Images/` | Original StudyBuddy branding. |
| `JS/Common.js` | Shared validation and feedback functions. |
| `JS/Data.js` | Fictional seed records and public demo accounts. |
| `JS/Demo.js` | Temporary profile storage and demo reset. |
| `Student/`, `Admin/`, `Advisor/`, `Coordinator/` | Role pages and matching `JS/` folders. |
| `Docs/` | Plan, learning guide, validation checklist, and proposed team responsibilities. |

## Learning and review

- [Code guide](Docs/CodeGuide.md): important concepts and annotated functions.
- [Validation checklist](Docs/ValidationChecklist.md): test cases and recorded verification status.
- [Team responsibilities](Docs/TeamResponsibilities.md): four proposed modules and honest contribution recording.

The Figma prototype was inaccessible during the initial inspection. The current visual direction is original and provisional; it is not presented as a verified reproduction of that prototype. Academic assumptions will be documented before later modules are implemented and will not be represented as official AIUB policy.
