# StudyBuddy Version 3 handoff

Version 3 continues Version 2 on `codex/studybuddy-version-3`. It does not rebuild the application or replace the existing account forms. The review branch starts from Version 2's `codex/studybuddy-milestone-1` branch because `main` has not yet received that foundation.

## Features implemented

- **Student:** sample progress; add/remove course rows; credit-weighted GPA with a displayed sample scale; semester offerings, selected credits, limit validation, and plan summary; course eligibility and reasons from completed prerequisites.
- **Administrator:** add a temporary catalog course with format, number, department, prerequisite, and duplicate checks; search fictional students by ID, name, email, or department.
- **Faculty Advisor:** validate student/semester/course/comment/status choices, display page-only notes, and change sample plan statuses to Approved, Needs Revision, or Pending.
- **Academic Coordinator:** add a temporary course offering; validate seats, schedule, duplicates, and matching faculty/time slots; combine semester and department filters.
- **Preserved:** homepage layout, original logo, four role colors, shared login, three role registrations, existing navigation, and registration validation.

## Files created

| File | Purpose |
|---|---|
| `JS/AcademicData.js` | Sample grade scale, credit limit, courses, students, offerings, faculty, schedules, plans, and lookup helpers. |
| `Student/JS/StudentDashboard.js` | Student academic interactions. |
| `Admin/JS/AdminDashboard.js` | Temporary course creation and search. |
| `Advisor/JS/AdvisorDashboard.js` | Advising notes and plan decisions. |
| `Coordinator/JS/CoordinatorDashboard.js` | Offering creation and schedule filters. |
| `Docs/Version3Handoff.md` | This summary. |

## Files modified

The four existing dashboard HTML files now contain working controls and load their matching scripts. `JS/Common.js` adds reusable numeric, text-length, and checkbox validation and includes textareas in error cleanup. `Design/Style.css` adds small responsive rules for dashboard form columns, course rows, checkbox lists, and summaries. `index.html` updates its existing feature description. README and the other four Docs files describe Version 3 and its verification limits.

The shared account scripts, `Login.html`, registration entry pages/scripts, and logo are unchanged by Version 3.

## Academic and data limits

The nine-grade scale and 18-credit limit are teaching assumptions, not official AIUB policy. The calculator computes GPA for entered courses, not official transcript CGPA or retake replacement. Recommendations inspect a single listed prerequisite; they do not use AI. Planning validates availability and credit load, not timetable/prerequisite eligibility. Plan review changes a sample status and does not run a complete academic audit.

All changes are page-local. Reloading or leaving restores the seed arrays. Admin additions do not carry to Student or Coordinator pages; advising notes and decisions are not sent to another role. Registration remains a temporary form/navigation demonstration, with no real authentication. There is no backend, permanent saving, browser storage, or external API.

## Verification

Executed checks passed: **38/38 dashboard behavior groups**, **36/36 existing login/registration regression groups**, and **28/28 static groups**. The static checks cover nine HTML pages, eleven JavaScript files, twelve forms, references, labels/IDs, and dynamic error references. Behavior coverage includes the 3-credit A+ plus 1-credit B calculation (GPA3.81, total4), F=0, credit-limit configuration, prerequisites, catalog/search updates, advising/review, offering/filter updates, and valid/invalid submissions/reset.

See [ValidationChecklist.md](ValidationChecklist.md) for coverage and manual cases. No real-browser pass is claimed: the environment does not expose the required browser-control tool. Browser rendering, native events/reset ordering, actual file navigation, accessibility-tree behavior, and small-screen layout still need manual browser review. A lightweight DOM fixture is not a substitute for those checks.

## Remaining work outside the Version 3 request

Course/student editing and deletion, official transcript/retake policy, multiple-prerequisite curricula, full timetable or room-conflict handling, and cross-role data sharing are not implemented. They are possible later frontend enhancements, not claims that backend work is required for this midterm. Current requested features should be assessed with the recorded checks and the browser limits above.
