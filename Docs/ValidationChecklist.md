# Version 3 validation record

The checks must distinguish source/fixture verification from a real browser run. Historical Version 2 results are not automatically evidence for changed Version 3 dashboards.

## Current recorded status

| Category | Status |
|---|---|
| Login and all three registration regressions | Passed: 36/36 grouped behavior checks. |
| Dashboard behavior and calculation checks | Passed: 38/38 grouped behavior checks using lightweight DOM fixtures. |
| HTML paths, fragments, labels/IDs, and JavaScript syntax | Passed: 28/28 static groups; nine HTML pages, eleven JavaScript files, twelve forms, and dynamically generated ID/error references. |
| Browser page opening, real navigation, rendering, and native events | Not performed: required managed `cua_repl.js` tool is unavailable. |

Do not mark a category passed until its checks have run. DOM fixtures cannot establish actual browser layout, event propagation, native reset timing, accessibility-tree behavior, or file-navigation behavior.

Executed dashboard coverage includes the hand-calculated GPA example below, F=0, invalid/dynamic rows, configurable semester-credit checks, prerequisite reasons, Admin additions/search, conditional Advisor comments and status changes, offering validation/filters, and resets. Regression coverage includes all four sample role destinations and all three registration forms. The source checks resolve file/fragment references and verify source syntax; they are not evidence that a browser actually opened the pages.

## Manual review cases

- Open Home and all four role links. Test the sample logins, the three registration forms, role-specific prompts, Administrator's no-registration message, and matching-role destinations.
- In CGPA, add/remove rows; calculate 3 credits A+ plus 1 credit B: total4 and GPA3.81. Check F contributes zero points. Reject empty courses, duplicate normalized names, unknown grades, zero/fractional/out-of-range credits, and no rows. Reset and edit must clear stale output.
- In Planner, choose Fall2026 and course boxes. Six 3-credit courses total18 and pass; seven total21 and fail at the initial limit. Semester changes/reset clear old selections and summaries. Unknown/unoffered or duplicate codes must fail.
- In Recommendations, try no completed courses, CSE101, CSE102, and CSE202. Confirm eligible/ineligible reasons and already-completed labels. Reject unknown or duplicate completed codes.
- In Admin, add a valid new course and see it in the current catalog. Reject duplicate/malformed codes, invalid credits/departments, unknown or self-prerequisites. Search by ID, case-changed name, and a missing term; test blank-query validation and reset.
- In Advisor, require student, semester, offered courses, comments, and status. Needs Revision requires at least30 comment characters. Check note rows and each plan-status update, including invalid plan/status values and reset.
- In Coordinator, add an offering and see it in the current filtered table when it matches. Reject invalid seats/schedules/sections, duplicate course–term–section, and a faculty member using the same term/time slot. Combine semester/department filters; check no matches and Clear Filters.
- Refresh or leave each page: added data must reset. A course added on Admin must not be claimed as saved or shared with another dashboard.
- In a real browser, review desktop/mobile widths, keyboard operation, visible errors, labels, overflow, JavaScript console output, native reset behavior, and working file links. These remain unverified until actually executed.

The project uses local sample arrays. No test may imply permanent storage, real authentication, official AIUB academic policy, AI recommendations, or a backend.
