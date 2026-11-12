# StudyBuddy — Version 4

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

## Version 4 dashboards

| Module | Working tools |
|---|---|
| Student | Academic profile and transcript, weighted GPA calculator, prerequisite checker, course recommendations, semester planner, graduation tracker, and a predefined-response Academic Assistant. |
| Administrator | Catalog addition, student search, and sample prerequisite, graduation, and academic-policy information. |
| Faculty Advisor | Student records and progress, validated advising notes, and sample course-plan review. |
| Academic Coordinator | Temporary course offerings, semester/department schedule filters, and faculty directory. |

Dashboards follow the supplied Figma screenshots: a dark navy sidebar, light gray workspace, white cards, blue navigation, and relevant quick actions for each role. The existing homepage, original [logo](Images/StudyBuddyLogo.png), shared login, role-colored registrations, and Version 3 forms are retained. Separate dashboard sections use ordinary HTML anchors and JavaScript; no framework or routing library is needed.

The code uses only HTML, CSS, and vanilla JavaScript. It follows the faculty HMS sample's shared helpers, named functions, fieldsets, loops, and field-level errors. Version 4 is developed on `codex/studybuddy-version-4`; Version 3 remains on `codex/studybuddy-version-3` at starting commit `c6839cab1923aa5e7de0feca36286277808e250d`.

## Temporary data

All academic records are fictional teaching data from `JS/AcademicData.js` and `JS/Version4Data.js`. Each dashboard loads its own fresh arrays. Added courses, advising notes, offering rows, and review decisions last only on that page. Refreshing or navigating away resets them. An Admin course addition does **not** appear on another dashboard after navigation or change the fixed demo degree curriculum.

New registration details, including demonstration passwords, exist only in the login document's memory and clear when it is refreshed or left, including opening a dashboard. Use fictional details and a practice password. There is no database, browser storage, backend, external API, permanent saving, or new authentication feature.

## Academic assumptions

The calculator uses this **sample scale, not an official AIUB grading policy**:

| Letter | A+ | A | B+ | B | C+ | C | D+ | D | F |
|---|---|---|---|---|---|---|---|---|---|
| Points | 4.00 | 3.75 | 3.50 | 3.25 | 3.00 | 2.75 | 2.50 | 2.25 | 0.00 |

GPA is `sum(credits × grade points) / sum(credits)`, rounded only for display. Course credits are whole numbers from 1 to 4. Retake replacement and institution-specific transcript rules are not implemented.

The complete teaching curriculum contains **40 courses and 120 credits**: Core 72, Major 36, and Elective 12. Amina's sample transcript contains 26 completed courses, 78 credits, and a calculated GPA of 3.52. This produces 65% progress and 42 remaining credits. These values deliberately follow the same records across the dashboard, profile, recommendations, and tracker, rather than copying the screenshot's example numbers.

Prerequisite checks require every listed prerequisite and any minimum earned credits. Recommendation cards use Amina's fixed sample profile. The existing completed-course checkbox form remains a separate **what-if** tool; it does not edit that profile. **Add to Plan** checks eligibility, availability, duplicates, and the credit limit. The existing checkbox planner checks offered selections and total credits; it is not a full prerequisite or timetable-conflict audit.

`semesterCreditLimit` in `JS/AcademicData.js` configures the demo limit, initially 18 credits. The Academic Assistant uses predefined responses and course-code matching in JavaScript. It does not contact an AI service or evaluate official academic records.

## Files and learning

Each role keeps its dashboard HTML and matching script in its own folder. `JS/Common.js` contains shared validation. `JS/AcademicData.js` and `JS/Version4Data.js` supply fictional records and academic rules. `JS/Dashboard.js` handles section navigation; `Design/Dashboard.css` styles dashboards without replacing the public-page stylesheet. Existing account data remains in `JS/Data.js`.

Read the [Version 4 handoff](Docs/Version4Handoff.md), [code guide](Docs/CodeGuide.md), [development stages](Docs/DevelopmentPlan.md), [team responsibilities](Docs/TeamResponsibilities.md), and [validation record](Docs/ValidationChecklist.md). The unchanged [Version 3 handoff](Docs/Version3Handoff.md) records the previous milestone.

Verification passed 143/143 grouped source/DOM-fixture checks. The validation record distinguishes those checks from browser testing. A real-browser visual and direct-file navigation review remains necessary because the managed browser tool was unavailable.
