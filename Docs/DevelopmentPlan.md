# StudyBuddy development plan

This is the approved frontend plan for AIUB Web Technologies, Fall 2026–27, Group 9. Milestone 1 is the shared foundation. Later features remain planned until implemented and tested.

## Boundaries and references

Use only HTML, CSS, and vanilla JavaScript. There is no backend, database, real authentication, or permanent data service. The faculty's extended HMS example is the main structural reference: separate role folders, one shared stylesheet, shared validation helpers, and one script per page. The smaller HospitalProject example also demonstrates shared registration validation.

The examples are educational evidence, not additional project requirements. Their five-pages-per-role arrangement does not require artificial StudyBuddy forms. StudyBuddy code is original. The Figma design was inaccessible during inspection, so visual matching remains unverified.

## Page roadmap: 17 pages

| Page | Purpose | Status |
|---|---|---|
| `index.html` | Introduce the project and offer all four roles. | Milestone 1 |
| `Login.html` | Validate the selected role and public demo credentials, then open its dashboard. | Milestone 1 |
| `Student/StudentRegistration.html` | Validate profile fields and show the temporary demo result. | Milestone 1 |
| `Student/StudentDashboard.html` | Role navigation and foundation shell; academic summaries come later. | Shell in Milestone 1 |
| `Student/AcademicProgress.html` | Display fictional completed courses, grades, credits, and remaining credits. | Planned |
| `Student/CGPACalculator.html` | Calculate a credit-weighted result from validated rows. | Planned |
| `Student/SemesterPlanner.html` | Check selected sections, prerequisites, credit limits, and timetable conflicts. | Planned |
| `Student/CourseRecommendations.html` | Explain course eligibility and available offerings. | Planned |
| `Admin/AdminDashboard.html` | Role navigation and foundation shell; management counts come later. | Shell in Milestone 1 |
| `Admin/StudentManagement.html` | Add/edit temporary fictional student records. | Planned |
| `Admin/CourseManagement.html` | Add/edit catalog courses, credits, prerequisites, and active status. | Planned |
| `Advisor/AdvisorDashboard.html` | Role navigation and foundation shell; advisees and pending plans come later. | Shell in Milestone 1 |
| `Advisor/AcademicAdvising.html` | Validate and display an advising note for a fictional student. | Planned |
| `Advisor/CoursePlanReview.html` | Recheck a submitted plan and record a demo review decision. | Planned |
| `Coordinator/CoordinatorDashboard.html` | Role navigation and foundation shell; offering/schedule summaries come later. | Shell in Milestone 1 |
| `Coordinator/CourseOffering.html` | Offer catalog courses in a term and section. | Planned |
| `Coordinator/SemesterSchedule.html` | Assign faculty, rooms, days, and times without conflicts. | Planned |

Every role page will provide Dashboard, Home, and Switch Role navigation. Planned features must be labeled clearly and must not link to nonexistent pages.

## Form validation matrix: 10 forms

| Form | Rules |
|---|---|
| Login | A known role, valid email, nonempty password, and matching public demo credentials for that role. |
| Student registration | Trimmed name 3–60 characters with normal name punctuation; project ID format `YY-NNNNN-S`, where `S` is 1–3; valid email; optional Bangladeshi mobile number beginning 013–019 with 11 digits; known program; semester 1–12; password of at least 8 characters containing uppercase, lowercase, and a digit; exact password confirmation; no duplicate demo/profile ID or email. |
| CGPA calculator | At least one complete, nonduplicate course row; finite numeric credits and grade points; credits within the documented demo range; grade points 0–4; paired previous credits/CGPA if provided; no zero denominator. |
| Semester planning | Available semester and at least one offered section; no duplicate/passed courses, inactive offerings, unmet prerequisites, excessive credits, or timetable overlaps. |
| Student management | Valid name, ID, email, program, admission semester, and status; duplicate checks exclude the record being edited; referenced IDs remain fixed. |
| Course management | Unique code, title, department, valid credits, and active status; prerequisites exist and cause no self-reference or cycle; referenced course codes remain fixed. |
| Academic advising | Existing advisee and topic; trimmed note of 20–500 characters; follow-up date required when selected and no earlier than the advising date. |
| Course-plan review | Existing submitted plan and decision; repeated academic checks; no approval with blocking issues; revision explanation of 20–500 characters. |
| Course offering | Active course, valid term/year, section, capacity, and status; no duplicate course–term–section; capacity is an integer within the documented demo range. |
| Semester schedule | Existing offering; at least one day; valid start/end, room, and faculty; end after start; no room/faculty overlap in the term/day; enough room capacity; editing excludes its own record. |

All forms show field-level errors, preserve values after an invalid submission, clear stale feedback on correction, and reset dependent controls. Shared validators return `true` or `false`. Each form runs all its validators before combining their results so all relevant errors appear together.

## Student module

Build registration and the dashboard shell first. Later, add academic progress, the calculator, recommendations, and the semester planner. Use ordinary arrays, loops, numeric checks, and DOM updates. The sample's dynamic doctor dropdown is a reference for course/section choices.

CGPA will be total credit-weighted grade points divided by total attempted credits, with rounding only for display. Retake replacement and university-specific rules are outside the initial calculator unless the applicable policy is provided. Recommendations will explain prerequisites and offering availability; they will not be described as an AI service.

## Administrator module

Build student and course management with temporary records and visible tables. Use the sample's AddStaff and ManageDepartment pages as educational references for page-specific and cross-field validation. Deactivate referenced records where deleting them would break linked demo records.

## Faculty Advisor module

Build advising notes and plan review after the student planner works. Reuse academic checks rather than introducing inconsistent advisor rules. Requesting revision requires a meaningful explanation. Editing a submitted student plan returns it to pending review.

## Academic Coordinator module

Build offerings before the student recommendation/planning pages. Then add schedules using time-to-minutes calculations like the sample's SetSchedule page. Two classes may meet back-to-back; intersecting times for the same room or faculty member are rejected.

## Shared data and assumptions

`JS/Data.js` contains fictional records. `JS/Demo.js` keeps temporary profiles in tab-session storage with an in-memory fallback when needed. Passwords are never stored. Registration does not create a real account, and demo login remains based on the published sample accounts.

The project ID pattern is a demonstration rule, not verification of an official AIUB rule. Before later academic modules, document the sample curriculum, credit ranges, grading assumptions, and semester credit limit centrally. An initial 18-credit limit is a project assumption until confirmed. Browser-local data is not shared across devices or teammates and can be reset.

## Implementation order

| Milestone | Deliverable | Dependency |
|---|---|---|
| 1 | Shared design, navigation, four dashboard shells, demo login, registration, and learning documents. | Approved plan. |
| 2 | Administrator student/course management. | Shared validation and data layout. |
| 3 | Coordinator offerings and schedules. | Course catalog. |
| 4 | Student progress and weighted CGPA calculator. | Student/catalog records. |
| 5 | Recommendations and semester planning. | Completed courses, offerings, and schedules. |
| 6 | Advising, plan review, and student-visible feedback. | Submitted plans. |
| 7 | Integrated validation, responsive/accessibility review, explanations, and demo rehearsal. | Working role modules. |

Before each module, explain which faculty-sample concepts will be used and explain any new technique. Keep changes reviewable and record actual checks. Never mark a feature complete based only on its visual appearance.
