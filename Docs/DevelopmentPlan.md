# Version 3 development stages

Version 3 extends the latest Version 2 code. It keeps the existing pages, logo, role colors, shared login, three registration forms, and navigation. The tools live in sections of the four existing dashboard pages; separate pages for every tool are not required.

| Stage | Implementation |
|---|---|
| Shared foundation | `AcademicData.js` supplies fictional academic arrays and lookup functions. `Common.js` adds number, text-length, and checkbox checks. Existing registration helpers remain. |
| Student | Dynamic course rows, weighted GPA, semester offerings and credit totals, configurable limit, recommendation reasons, and sample completed courses. |
| Administrator | Validated catalog addition, current-page catalog table, and case-insensitive student search with no-match feedback. |
| Faculty Advisor | Student/semester/course choices, advising comments and status, temporary note table, and editable sample plan statuses. |
| Academic Coordinator | Validated offering details, duplicate/faculty-slot checks, and schedule filtering by semester and department. |
| Handoff | Code explanations, proposed team ownership, executed checks, limitations, and review pull request. |

## Faculty-sample concepts

Forms call named JavaScript functions and use fieldsets with individual error paragraphs. Each check returns a Boolean. All checks run before their results are combined, so errors appear together. Dropdowns and checkbox lists are filled using ordinary arrays, loops, and `createElement()`, similar to the sample's dependent doctor selection. The coordinator's schedule choices and field comparisons follow the sample's cross-field validation approach.

No framework, backend, external API, browser storage, or real authentication is added. Each dashboard gets a fresh copy of the teaching arrays; page changes are not shared or permanently saved.

## Version 3 form coverage

| Form or control | Main rules |
|---|---|
| Existing login and three registrations | Existing required fields, role-based prompts, project ID patterns, duplicate checks, password confirmation, and matching demo navigation. |
| CGPA calculator | At least one complete row; unique normalized course names; integer credits 1–4; a listed grade; no zero denominator. |
| Semester planner | Known semester; at least one unique offered course; total within `semesterCreditLimit`. |
| Course recommendations | Completed values must be unique known course codes; zero completed courses is valid. |
| Add course | Unique formatted code, title 3–80 characters, integer credits 1–4, known department, existing prerequisite or None, no self-prerequisite. |
| Student search | Trimmed query 2–80 characters; case-insensitive matches; explicit no-match message. |
| Academic advising | Known student/semester/status; at least one offered course within the credit limit; comments 10–500 characters, at least 30 for Needs Revision. |
| Course-plan review | Existing plan and one of Approved, Needs Revision, or Pending; update the page's array and visible status. |
| Course offering | Known course/semester/faculty/schedule; section format; integer seats 1–60; no duplicate course–semester–section or faculty using the same semester/time slot. |
| Schedule filters | Known semester/department or All; combine both filters and handle an empty result. |

The sample grade scale, credit limits, ID patterns, curriculum, and schedules are project rules, not official AIUB policy. The [handoff](Version3Handoff.md) identifies what is complete, what was checked, and what remains outside this version.
