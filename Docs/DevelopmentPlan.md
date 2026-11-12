# Version 4 development stages

Version 4 extends Version 3 on `codex/studybuddy-version-4`. The previous version remains on `codex/studybuddy-version-3`, starting from commit `c6839cab1923aa5e7de0feca36286277808e250d`. Its original [handoff](Version3Handoff.md) remains a historical record.

## Implementation order

| Stage | Work and purpose |
|---|---|
| 1. Review and preserve | Read the existing pages, forms, scripts, and faculty-sample approach. Create the V4 branch before changes. Keep login, registrations, logo, and working V3 form IDs. |
| 2. Shared dashboard shell | Add dashboard-only CSS and simple section navigation. Use the supplied screenshots for the navy sidebar, gray workspace, white cards, blue buttons, and header. |
| 3. Consistent sample records | Extend the existing arrays into a fictional 40-course, 120-credit curriculum. Calculate transcript GPA, credits, category totals, and eligibility from those records. |
| 4. Student tools | Keep GPA/planner/what-if forms. Add separate prerequisite, recommendation, graduation, assistant, and alert sections, with working cross-section actions. |
| 5. Staff dashboards | Apply the shared layout to Admin, Advisor, and Coordinator. Derive summaries from their actual records; retain all existing management forms and add relevant read-only sections. |
| 6. Regression and handoff | Run source and behavior checks, record their limits, explain the important functions, and prepare V4 for review without merging away V3. |

The code uses the faculty HMS sample's ordinary HTML forms, fieldsets, named functions, individual error paragraphs, Boolean validation results, arrays, loops, and DOM updates. Each new module keeps those concepts rather than introducing a framework.

## Page and section roadmap

| Page | Sections and navigation |
|---|---|
| `index.html` | Existing public homepage and four role entry links. |
| `Login.html` | Shared login; dynamic role-specific registration link; Student, Advisor, and Coordinator registration sections; institution-assigned Admin message. |
| Role registration entry pages | Existing links open the matching registration section in the shared login document. |
| `Student/StudentDashboard.html` | Overview, Academic Profile, CGPA Calculator, Prerequisite Checker, Course Recommendations, Semester Planner, Graduation Tracker, Academic Assistant, Academic Alerts. |
| `Admin/AdminDashboard.html` | Overview, Add Course, Student Search, Prerequisite Rules, Graduation Requirements, Academic Policies. |
| `Advisor/AdvisorDashboard.html` | Overview, Student Records, Academic Progress, Academic Advising, Course Plan Review. |
| `Coordinator/CoordinatorDashboard.html` | Overview, Course Offering, Semester Schedule, Faculty Directory, Offering Guidelines. |

The dashboard tools are distinct sections in each role's HTML file. Hash links such as `#semester-planner` select a section, support direct linking and browser history, and work without fetching files.

## Form coverage

| Form or control | Main rules |
|---|---|
| Existing login and three registrations | Existing required fields, role prompts, project ID patterns, duplicate emails, password rules/confirmation, and matching-role demo navigation. Admin has no public registration. |
| CGPA calculator | At least one complete row; unique normalized course names; integer credits 1–4; a listed grade; no zero denominator. |
| Prerequisite checker | A known course; show all required prerequisites, missing courses, earned credits, and any minimum-credit rule against the fixed sample profile. |
| Course recommendations what-if form | Completed values must be unique known course codes; zero completed courses is valid. This does not update the transcript. |
| Recommendation Add to Plan | Course eligible for the sample profile, offered, not already selected, and within the credit limit; do not discard another semester's nonempty plan. |
| Semester planner | Known semester; at least one unique offered course; total within `semesterCreditLimit`. |
| Academic Assistant | Trimmed question 2–300 characters; use predefined replies and safe text output. |
| Add course | Unique formatted code, title 3–80 characters, integer credits 1–4, known department, existing prerequisite or None, no self-prerequisite. |
| Student search | Trimmed query 2–80 characters; case-insensitive matches; explicit no-match message. |
| Academic advising | Known student/semester/status; at least one offered course within the credit limit; comments 10–500 characters, at least 30 for Needs Revision. |
| Course-plan review | Existing plan and one of Approved, Needs Revision, or Pending; update the current page's array and visible status. |
| Course offering | Known course/semester/faculty/schedule; section format; integer seats 1–60; no duplicate course–semester–section or faculty using the same semester/time slot. |
| Schedule filters | Known semester/department or All; combine both filters and handle an empty result. |

## Scope limits

No framework, backend, external API, browser storage, or real authentication is added. Each dashboard gets fresh teaching arrays; changes are not shared or permanently saved. The curriculum, grades, IDs, credit limits, and schedules are project rules rather than official AIUB policy. The planner's checkbox form does not run a full timetable-conflict audit. See the [V4 handoff](Version4Handoff.md) and [validation record](ValidationChecklist.md) for verification details.
