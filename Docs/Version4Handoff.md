# StudyBuddy Version 4 handoff

Version 4 applies the supplied Figma dashboard layout to the existing frontend and adds distinct student planning sections. It retains the StudyBuddy name, original PNG logo, public homepage, shared login, three role-specific registrations, and all Version 3 forms.

## Branches and running

- Version 3: `codex/studybuddy-version-3`, base commit `c6839cab1923aa5e7de0feca36286277808e250d`.
- Version 4: `codex/studybuddy-version-4`.
- Download/extract the V4 branch, then double-click `index.html`; enable JavaScript. No installation, server, internet connection, or build is needed.
- Use the sample account table in [README](../README.md). Registration lasts only in the current `Login.html` document; use Go to login without refreshing.

The [Version 3 handoff](Version3Handoff.md) is preserved as history. Review the V4 branch before deciding whether to merge it.

## What changed

| Area | Version 4 behavior |
|---|---|
| Shared dashboard layout | Dark navy sidebar, light gray workspace, rounded white cards, blue active navigation/buttons, header, profile controls, quick actions, and responsive menu. Styling is scoped to dashboards. |
| Student overview/profile | Summary cards and transcript use the same sample grades and completed courses. GPA calculator and its add/remove rows remain. |
| Prerequisite Checker | Separate validated course selection, required/missing prerequisite list, earned/minimum credit comparison, and an explained eligibility result. |
| Course Recommendations | Sample-profile recommendations with functional Add to Plan actions. The original completed-checkbox form remains a clearly separate what-if tool. |
| Semester Planner | Original semester, course checkbox, total-credit, validation, and reset controls remain; Add to Plan updates their actual selections. |
| Graduation Tracker | Separate overall and category progress calculated from the complete teaching curriculum. |
| Academic Assistant | Suggested questions, validated text input, course-code/keyword responses, and conversation clearing, using predefined JavaScript responses. |
| Administrator | Existing Add Course and Student Search forms, actual catalog summary counts, and read-only prerequisite, graduation, and academic policy sections. |
| Faculty Advisor | Existing advising and plan-review forms, student records/progress, and summary counts based on current sample arrays. |
| Academic Coordinator | Existing offering/schedule forms and filters, actual offering summaries, directory, and offering guidelines. |

All relevant sidebar and quick-action links open real sections. Administrative rules without an editor are presented as read-only views. There is no decorative AI generation control or backend action.

## Main files

```text
StudyBuddy/
├── index.html                         Existing homepage
├── Login.html                         Existing login and registration sections
├── Design/
│   ├── Style.css                      Existing public/role foundation
│   └── Dashboard.css                  New dashboard layout and responsive rules
├── Images/StudyBuddyLogo.png           Existing logo, retained
├── JS/
│   ├── Common.js                      Existing reusable validation
│   ├── Data.js                        Existing demo account data
│   ├── Login.js                       Existing role/login navigation
│   ├── AcademicData.js                 Version 3 academic foundation
│   ├── Version4Data.js                 Curriculum, transcript, eligibility helpers
│   └── Dashboard.js                    Shared section/sidebar navigation
├── Student/
│   ├── StudentDashboard.html
│   ├── StudentRegistration.html
│   └── JS/
│       ├── StudentDashboard.js         Retained GPA/planner/what-if functionality
│       ├── StudentFeatures.js          New V4 student sections and actions
│       └── StudentRegistration.js
├── Admin/                             Dashboard HTML and JS
├── Advisor/                           Dashboard and registration HTML/JS
├── Coordinator/                       Dashboard and registration HTML/JS
└── Docs/                              Guides, roadmap, validation, handoffs
```

Dashboard script order is `Common.js`, `AcademicData.js`, `Version4Data.js`, `Dashboard.js`, then role scripts. These are local script files, without modules, imports, fetch, or build tools. The V4 CSS loads after `Style.css` and applies to dashboard pages.

## Consistent teaching records

The fictional curriculum contains 40 courses, each worth 3 credits, for 120 credits total. Core has 24 courses/72 credits; Major has 12/36; Elective has 4/12. Amina's transcript contains 26 completed courses/78 credits: 19 Core, 6 Major, and 1 Elective. Her weighted GPA displays 3.52, progress is 65%, and 42 credits remain.

The Prerequisite Checker and recommendation cards use that fixed profile. For example, Web Technologies (`CSE301`) requires three completed prerequisites and 60 earned credits; Amina meets them. Capstone Project I (`CSE401`) requires 90 credits, so she does not yet qualify. The old checkbox recommendation form can explore other completion lists without changing the transcript or graduation progress.

Staff summary counts come from the arrays displayed by the page. Screenshot numbers such as 148 courses or 96 earned credits are visual examples and are not copied into this different teaching dataset. The supplied screenshots guide appearance; the project remains named StudyBuddy and does not claim AI functionality.

## Key code to explain at defense

| Function/file | Beginner-level explanation |
|---|---|
| `initializeDashboard()` / `showDashboardSection()` | Find a section by ID, hide the other sections, update headings/active links, and keep the URL hash in sync. |
| `getDemoProgress()` | Loop over curriculum categories and completed courses; total credits and calculate weighted GPA from matching grade records. |
| `getCourseEligibility()` | Look up a course, count unique completed credits, find all missing prerequisites, and apply the minimum-credit rule. |
| `addRecommendationToPlan()` | Recheck eligibility, offering, duplicate selection, semester, and credit limit before selecting a real planner checkbox. |
| `getAcademicAssistantReply()` | Match course codes and a small set of keywords; return predefined text. |
| Existing role scripts | Read fields, call shared validators, combine Boolean results, update arrays, and render safe text into the DOM. |

See the [code guide](CodeGuide.md) for line-by-line examples and the [four proposed modules](TeamResponsibilities.md) for review responsibilities. Proposed assignments are not claims that teammates authored this implementation.

## Verification

**143/143 grouped source and DOM-fixture checks passed on 12 November 2026:** 35 static/source, 36 login/registration, 38 retained dashboard regressions, and 34 V4 feature checks. All 12 original forms retain their IDs and submit/reset handlers; the checker and assistant add two forms. Homepage, account/registration files, shared validation, and logo were compared with the V3 baseline. The [validation record](ValidationChecklist.md) details coverage; historical V3 results are listed separately.

A real-browser run is not recorded because the managed browser testing tool is unavailable. The fixtures manually dispatch hash callbacks, and CSS checks inspect source rules. Rendering/screenshot accuracy, responsive geometry/overflow, native keyboard/focus/hash/reset behavior, and actual direct-file navigation still need browser review. Source/DOM checks alone cannot establish these results.

## Frontend limits

- No database, backend, API, frameworks, browser storage, real authentication, or permanent saving.
- Registration accounts clear when refreshing or leaving the login document, including opening a dashboard. Use fictional details and a practice password.
- Academic additions/notes/reviews/offering changes are page-local and reset after refresh/navigation. They are not shared between roles. New Admin catalog entries do not change the fixed curriculum.
- The existing planner validates offered selections and total credits; it is not a complete prerequisite or timetable-conflict audit. Recommendation Add to Plan performs its own sample eligibility checks.
- The assistant uses fixed rules and responses, not AI. No official advising, enrollment, approval, or graduation decision occurs.
- Curriculum, grading scale, IDs, schedules, and credit rules are teaching examples, not official AIUB academic policy. The GPA calculator does not implement institution-specific retake replacement.

## Suggested review sequence

Open the homepage, test all four sample logins and three role registrations, then inspect each sidebar. On Student, compare 78/120 credits across overview/profile/tracker; test `CSE301` and `CSE401`; add an offered recommendation to the planner; run a GPA calculation and an assistant question. On staff dashboards, submit one valid and one invalid form, check resets/filters, and refresh to confirm temporary data clears. The full case list is in [ValidationChecklist.md](ValidationChecklist.md).
