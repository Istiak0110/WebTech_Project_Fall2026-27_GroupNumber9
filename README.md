# StudyBuddy

**Student Academic Planning and Course Recommendation System**

American International University-Bangladesh (AIUB)

Web Technologies, Fall 2026–27 · Group 9

StudyBuddy is a student project built with HTML, CSS, and vanilla JavaScript. It follows the role folders, shared stylesheet, shared validation helpers, and page-specific scripts demonstrated in the faculty's Hospital Management System examples.

## Current milestone

Milestone 1 establishes the foundation:

- Home page and navigation for four roles.
- One demo login form with role-specific dashboard destinations.
- Student registration with JavaScript validation.
- Student, Administrator, Faculty Advisor, and Academic Coordinator dashboard shells.
- Shared styling, fictional demo accounts, and temporary registration profiles.

Dashboard feature cards describe planned work. Their local links open the corresponding roadmap sections; calculators, academic planning, management, advising, and scheduling are not implemented in this milestone. See [the full development plan](Docs/DevelopmentPlan.md).

## Open the project

Open `index.html` in a browser. No installation or build is required. Enable JavaScript to use forms and role navigation.

For consistent temporary data between pages, use an editor's static preview and keep the same browser tab and origin. This only serves the HTML, CSS, and JavaScript files; the application has no backend logic. Browsers can restrict storage differently when pages are opened with `file://`.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Student | `student@studybuddy.example` | `StudyBuddy1` |
| Administrator | `admin@studybuddy.example` | `StudyBuddy1` |
| Faculty Advisor | `advisor@studybuddy.example` | `StudyBuddy1` |
| Academic Coordinator | `coordinator@studybuddy.example` | `StudyBuddy1` |

These public credentials simulate navigation. They provide no authentication or access protection. Use fictional details when trying registration. A successful registration does not create a login account; continue with the demo Student account.

Registration passwords are validated but never saved. Valid profile details can be kept in `sessionStorage` for the current browser tab's session. If storage is blocked or unusable, the page uses a temporary in-memory fallback and displays its limited scope. Reset Demo removes StudyBuddy's temporary profiles and restores the seed records; it does not clear unrelated browser storage.

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
