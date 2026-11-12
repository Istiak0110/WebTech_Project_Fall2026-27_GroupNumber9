# Proposed four-person modules

| Member slot | Main files | What to explain and review |
|---|---|---|
| 1 — Student | `Student/StudentDashboard.html`, `Student/JS/StudentDashboard.js`, `Student/JS/StudentFeatures.js` | Weighted GPA, dynamic rows, prerequisite checks, recommendation Add to Plan, graduation totals, predefined assistant replies, and resets. |
| 2 — Administrator | `Admin/AdminDashboard.html`, `Admin/JS/AdminDashboard.js` | Course/credit validation, duplicate checking, array additions, case-insensitive search, catalog summaries, and read-only policy sections. |
| 3 — Faculty Advisor | `Advisor/AdvisorDashboard.html`, `Advisor/JS/AdvisorDashboard.js` | Student records/progress, conditional comment length, note rendering, plan status updates, and summary counts. |
| 4 — Academic Coordinator | `Coordinator/CoordinatorDashboard.html`, `Coordinator/JS/CoordinatorDashboard.js` | Offering fields, duplicate/faculty-time checks, semester/department filters, schedule rows, directory, and overview totals. |

These are proposed assignments, not authorship claims. The initial implementation was prepared with a coding assistant under the coordinator's direction. Record each teammate's actual edits, tests, and reviews when they happen; do not fabricate contributions or commits.

## Shared foundation

Review changes to `JS/Common.js`, `JS/AcademicData.js`, `JS/Version4Data.js`, `JS/Dashboard.js`, `Design/Style.css`, and `Design/Dashboard.css` together. All four modules use the shared data and navigation. Login and role-registration scripts remain shared foundation work; each teammate should understand the registration for their own role.

Before editing a module, identify the HMS concepts it uses: labeled forms and fieldsets, named functions, `if/else` checks, loops, matching field/error IDs, Boolean return values, and DOM text updates. Trace one submitted field from HTML to its validator and visible result.

Each member should demonstrate a valid submission, an invalid submission, a reset, a sidebar link, and the resulting DOM update. They should also explain why data disappears after navigation or refresh and why the teaching records are not official academic policy.

## Actual contribution record

| Person | Actual contribution | Files/commit | Verification or review |
|---|---|---|---|
| Unassigned | No individual teammate contribution recorded yet. | — | — |

Version 3 remains on `codex/studybuddy-version-3`; review Version 4 on `codex/studybuddy-version-4` before choosing whether to merge it.
