# StudyBuddy

Student Academic Planning and Course Recommendation System

AIUB · Web Technologies · Fall 2026–27 · Group 9

## Run

Extract the project and double-click `index.html`. Enable JavaScript. No installation, server, or build is needed.

Choose a role and use one of the sample accounts below. To try registration, choose Student Registration, enter fictional details, then use **Go to login** on the same page. Choose Student and enter the password you registered.

New registrations exist only in the `Login.html` page's JavaScript memory. Refreshing or leaving that page clears them, including opening a dashboard. Nothing is permanently saved. This is a form and navigation demonstration, not real authentication.

| Role | Email | Password |
|---|---|---|
| Student | student@studybuddy.example | StudyBuddy1 |
| Administrator | admin@studybuddy.example | StudyBuddy1 |
| Faculty Advisor | advisor@studybuddy.example | StudyBuddy1 |
| Academic Coordinator | coordinator@studybuddy.example | StudyBuddy1 |

## Current work

This draft contains Home, login, student registration, and four separate dashboard layouts. Academic progress, CGPA calculation, planning, management, advising, and scheduling are future parts of the project. They are labeled accordingly.

The code uses HTML, CSS, and vanilla JavaScript. Its shared stylesheet, shared validators, fieldsets, error paragraphs, role folders, and named page functions follow the faculty's HMS examples. StudyBuddy's code and page content are original.

## Appearance

The pages keep a simple academic layout with softer borders and consistent spacing. Student uses blue, Administrator purple, Faculty Advisor green, and Academic Coordinator amber. The login form changes color when its role is selected; student registration uses the Student theme.

The original [StudyBuddy logo](Images/StudyBuddyLogo.png) was generated for this project. It combines two students and an open book in navy and teal, and appears in the headers and browser tabs. The image is included locally, so it works without an internet connection.

## Files

- `Design/Style.css`: shared appearance and small-screen layout.
- `Images/StudyBuddyLogo.png`: original transparent project logo.
- `JS/Common.js`: validation and error helpers.
- `JS/Data.js`: sample accounts and temporary registration array.
- `JS/Login.js`: show the forms and check login details.
- `Student/JS/StudentRegistration.js`: student registration rules.
- `Student/`, `Admin/`, `Advisor/`, `Coordinator/`: role dashboards.

The two forms share `Login.html` so temporary registration data does not need to move between files. `Student/StudentRegistration.html` opens that registration section for older links.

Read the [code guide](Docs/CodeGuide.md), [development plan](Docs/DevelopmentPlan.md), [team responsibilities](Docs/TeamResponsibilities.md), and [short validation notes](Docs/ValidationChecklist.md).
