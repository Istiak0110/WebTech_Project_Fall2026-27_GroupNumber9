# StudyBuddy — Version 3

Student Academic Planning and Course Recommendation System

AIUB · Web Technologies · Fall 2026–27 · Group 9

## Run

Extract the project and double-click `index.html`. Enable JavaScript. No installation, server, internet connection, or build is needed. Choose a role and use its sample account:

| Role | Email | Password |
|---|---|---|
| Student | student@studybuddy.example | StudyBuddy1 |
| Administrator | admin@studybuddy.example | StudyBuddy1 |
| Faculty Advisor | advisor@studybuddy.example | StudyBuddy1 |
| Academic Coordinator | coordinator@studybuddy.example | StudyBuddy1 |

Student, Faculty Advisor, and Academic Coordinator retain their separate registration forms on the shared login page. After registering fictional details, use **Go to login** without refreshing. Administrator has no public registration. These existing controls demonstrate navigation and validation; they provide no real authentication.

## Dashboard features

| Module | Working tools |
|---|---|
| Student — Blue | Sample completed courses, add/remove GPA rows, weighted GPA, semester course selection and credit limit, prerequisite-based recommendations with reasons. |
| Administrator — Purple | Add a course to the current page's catalog and search the fictional student list. |
| Faculty Advisor — Green | Validate and display advising notes; update sample course-plan statuses. |
| Academic Coordinator — Amber | Add a temporary offering; filter semester schedules by semester and department. |

The existing homepage, original [logo](Images/StudyBuddyLogo.png), color themes, shared login, and registration navigation are retained. The code uses only HTML, CSS, and vanilla JavaScript, following the faculty HMS sample's shared helpers, named functions, fieldsets, loops, and field-level errors.

## Temporary data

All academic records are fictional teaching data from `JS/AcademicData.js`. Each dashboard loads its own fresh arrays. Added courses, advising notes, offering rows, and review decisions last only on that page. Refreshing or navigating away resets them. An Admin course addition does **not** appear on another dashboard after navigation.

New registration details, including demonstration passwords, exist only in the login document's memory and clear when it is refreshed or left, including opening a dashboard. Use fictional details and a practice password. There is no database, browser storage, backend, external API, permanent saving, or new authentication feature.

## Academic assumptions

The calculator uses this **sample scale, not an official AIUB grading policy**:

| Letter | A+ | A | B+ | B | C+ | C | D+ | D | F |
|---|---|---|---|---|---|---|---|---|---|
| Points | 4.00 | 3.75 | 3.50 | 3.25 | 3.00 | 2.75 | 2.50 | 2.25 | 0.00 |

GPA is `sum(credits × grade points) / sum(credits)`, rounded only for display. Course credits are whole numbers from 1 to 4. Retake replacement and institution-specific transcript rules are not implemented.

`semesterCreditLimit` in `JS/AcademicData.js` configures the demo limit, initially 18 credits. Recommendations use each course's single predefined prerequisite and the completed boxes selected by the user. They are ordinary rules, not AI or machine learning. The planner checks offered-course selections and total credits; it does not enforce prerequisite or timetable eligibility.

## Files and learning

Each role keeps its dashboard HTML and matching script in its own folder. `JS/Common.js` contains shared validation; `JS/AcademicData.js` supplies fictional academic records and lookup helpers. Existing account data remains in `JS/Data.js`.

Read the [Version 3 handoff](Docs/Version3Handoff.md), [code guide](Docs/CodeGuide.md), [development stages](Docs/DevelopmentPlan.md), [team responsibilities](Docs/TeamResponsibilities.md), and [validation record](Docs/ValidationChecklist.md).
