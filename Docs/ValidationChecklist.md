# Version 4 validation record

The checks distinguish source/fixture verification from a real browser run. Historical Version 3 results are not automatically evidence for changed Version 4 dashboards.

## Version 4 recorded status

**143/143 grouped source and DOM-fixture checks passed on 12 November 2026.** These are source/fixture results, not a real-browser test.

| Category | Status |
|---|---|
| Static/source | Passed 35/35: HTML links/fragments, IDs/labels/ARIA, script order/syntax, frontend restrictions, preserved forms/account files/logo, and CSS source sanity. |
| Login and three registration regressions | Passed 36/36: four sample logins, three registrations, role prompts/matching, duplicate rejection, resets, and temporary-account continuation. |
| Retained dashboard forms and calculations | Passed 38/38: weighted GPA/lifecycle, planner/recommendations, course add/search, advising/review, and offerings/conflicts/filters/reset. |
| Version 4 features | Passed 34/34: curriculum/transcript consistency, prerequisite/tracker rules, Add to Plan, assistant, four-role navigation/state, heading-focus/scroll calls, handler/table checks, and derived counters. |
| Real browser rendering, native events, and direct-file navigation | Not performed: managed browser testing tool is unavailable. |

Do not mark a category passed until its checks have run. DOM fixtures cannot establish actual browser layout, event propagation, native reset timing, accessibility-tree behavior, or file-navigation behavior.

All 12 original V3 form IDs and submit/reset handlers remain; Prerequisite Checker and Academic Assistant bring the total to 14 forms. Homepage, login/account/registration files, shared validation, and the original logo were compared with the V3 baseline. Existing dashboard checks were adapted to intentional sample-data changes rather than assuming the old nine-course catalog or original completion counts.

Independent checks recomputed 40 courses/120 credits, Amina's 78 credits/65%/3.52 GPA/42 remaining, category totals, transcript coverage, prerequisite references and absence of cycles, valid sample plans, and offering references/conflicts. Interaction fixtures checked sidebar/hash/active state, preserved form values, mobile menu state, heading-focus/scroll calls after section changes, Add to Plan safeguards, text-safe assistant replies, and live counters. The checks found stale planner Add to Plan feedback after reset/semester change; it was fixed and checked again.

The fixture manually dispatches hash-change callbacks. CSS checks inspect source rules only. Screenshot matching, rendered responsive widths/overflow, native keyboard/focus/hash/reset behavior, and opening local files in Chrome/Edge remain unverified. The external verification harness does not add a runtime dependency to StudyBuddy.

## Historical Version 3 results

These results belong to the previous milestone, whose handoff is preserved in `Version3Handoff.md`. They are retained for comparison, not asserted as a fresh V4 run.

| Category | Status |
|---|---|
| Login and all three registration regressions | Passed: 36/36 grouped behavior checks. |
| Dashboard behavior and calculation checks | Passed: 38/38 grouped behavior checks using lightweight DOM fixtures. |
| HTML paths, fragments, labels/IDs, and JavaScript syntax | Passed: 28/28 static groups; nine HTML pages, eleven JavaScript files, twelve forms, and dynamically generated ID/error references. |
| Browser page opening, real navigation, rendering, and native events | Not performed: required managed `cua_repl.js` tool is unavailable. |

Executed dashboard coverage includes the hand-calculated GPA example below, F=0, invalid/dynamic rows, configurable semester-credit checks, prerequisite reasons, Admin additions/search, conditional Advisor comments and status changes, offering validation/filters, and resets. Regression coverage includes all four sample role destinations and all three registration forms. The source checks resolve file/fragment references and verify source syntax; they are not evidence that a browser actually opened the pages.

## Manual review cases

- Open Home and all four role links. Test the sample logins, the three registration forms, role-specific prompts, Administrator's no-registration message, and matching-role destinations.
- Open each dashboard's sidebar links and quick actions. Confirm only the chosen section is visible and its heading/active link match; test a valid direct section hash and browser Back/Forward. At mobile width test the menu toggle and keyboard focus.
- Compare Amina's overview, profile, and Graduation Tracker: 26 completed courses, 78/120 credits, 65%, GPA3.52, and 42 credits remaining. Category totals must match the 40-course curriculum. Staff counts must agree with their actual tables rather than screenshot placeholder values.
- In Prerequisite Checker, reject a blank/unknown course; check CSE301 succeeds for the sample profile and CSE401 explains the 90-credit requirement. Check missing prerequisites using the what-if form and confirm this form does not change the fixed profile/tracker.
- Add an eligible offered recommendation and confirm the actual planner selection and credit total change. Reject a duplicate, an unavailable course, an over-limit addition, and a course offered in another semester when that would discard an existing nonempty plan.
- Ask the Academic Assistant a suggested question, a known course code, GPA/credit-limit/graduation questions, and an unsupported topic. Reject fewer than2 or more than300 characters. Ensure entered HTML is displayed as text and Clear conversation resets the page-local messages.
- In CGPA, add/remove rows; calculate 3 credits A+ plus 1 credit B: total4 and GPA3.81. Check F contributes zero points. Reject empty courses, duplicate normalized names, unknown grades, zero/fractional/out-of-range credits, and no rows. Reset and edit must clear stale output.
- In Planner, choose Fall2026 and course boxes. Six 3-credit courses total18 and pass; seven total21 and fail at the initial limit. Semester changes/reset clear old selections and summaries. Unknown/unoffered or duplicate codes must fail.
- In Recommendations, try no completed courses, CSE101, CSE102, and CSE202. Confirm eligible/ineligible reasons and already-completed labels. Reject unknown or duplicate completed codes.
- In Admin, add a valid new course and see it in the current catalog. Reject duplicate/malformed codes, invalid credits/departments, unknown or self-prerequisites. Search by ID, case-changed name, and a missing term; test blank-query validation and reset.
- In Advisor, require student, semester, offered courses, comments, and status. Needs Revision requires at least30 comment characters. Check note rows and each plan-status update, including invalid plan/status values and reset.
- In Coordinator, add an offering and see it in the current filtered table when it matches. Reject invalid seats/schedules/sections, duplicate course–term–section, and a faculty member using the same term/time slot. Combine semester/department filters; check no matches and Clear Filters.
- Refresh or leave each page: added data must reset. A course added on Admin must not be claimed as saved or shared with another dashboard.
- In a real browser, review desktop/mobile widths, keyboard operation, visible errors, labels, overflow, JavaScript console output, native reset behavior, and working file links. These remain unverified until actually executed.

The project uses local sample arrays. No test may imply permanent storage, real authentication, official AIUB academic policy, AI recommendations, or a backend.
