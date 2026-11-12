# Development plan

StudyBuddy uses HTML, CSS, and vanilla JavaScript. The faculty's HMS examples guide the role folders, shared CSS, shared validation, and separate page scripts. Their exact page counts are sample details, not extra requirements. The Figma prototype was inaccessible, so this draft uses a simple layout based on the sample.

## Pages

The complete plan has 17 page destinations. In this draft the registration form shares `Login.html` with login; the registration URL is a small compatibility page. This keeps a temporary account in one page's memory without browser storage.

| Page destination | Work |
|---|---|
| index.html | Home and four role links; current draft. |
| Login.html | Login and registration sections; current draft. |
| Student/StudentRegistration.html | Opens the shared registration section; current draft. |
| Student/StudentDashboard.html | Dashboard layout; current draft. |
| Student/AcademicProgress.html | Completed courses, grades, and credits; later. |
| Student/CGPACalculator.html | Credit-weighted calculation; later. |
| Student/SemesterPlanner.html | Course selection and eligibility checks; later. |
| Student/CourseRecommendations.html | Eligible courses with reasons; later. |
| Admin/AdminDashboard.html | Dashboard layout; current draft. |
| Admin/StudentManagement.html | Add/edit sample student records; later. |
| Admin/CourseManagement.html | Course catalog and prerequisites; later. |
| Advisor/AdvisorDashboard.html | Dashboard layout; current draft. |
| Advisor/AcademicAdvising.html | Advising form; later. |
| Advisor/CoursePlanReview.html | Review a course plan; later. |
| Coordinator/CoordinatorDashboard.html | Dashboard layout; current draft. |
| Coordinator/CourseOffering.html | Semester offerings; later. |
| Coordinator/SemesterSchedule.html | Class times and rooms; later. |

Future filenames above describe work to build; they are not working page links.

## Forms and rules

| Form | Validation |
|---|---|
| Login | Known role, valid email, nonempty password, matching sample or temporary Student account. |
| Student registration | Name, project-format ID, email, optional BD phone, known program/semester, strong demo password and matching confirmation; no duplicate ID/email. |
| CGPA calculator | Complete unique course rows, valid credits and grade points, nonzero credit total; later. |
| Semester planning | Offered sections, completed prerequisites, no duplicates, credit limit and timetable checks; later. |
| Student management | Required details, valid fields, duplicate checks excluding the edited record; later. |
| Course management | Unique code, title, credits, valid prerequisites without cycles; later. |
| Academic advising | Existing student, topic, meaningful note, valid follow-up if selected; later. |
| Course-plan review | Existing plan, decision, repeat eligibility checks, explanation for revision; later. |
| Course offering | Active course, term, section, integer capacity, no duplicate offering; later. |
| Semester schedule | Offering, day, room, faculty, start before end, no room/faculty overlap; later. |

Academic ID formats, credit limits, and curriculum data are project assumptions until an applicable AIUB policy is supplied. CGPA will use total credit-weighted grade points divided by total attempted credits; institution-specific retake rules need confirmation.

## Order

1. Finish this simple foundation: shared design, navigation, login, registration, and dashboard layouts.
2. Administrator: student records and course catalog.
3. Coordinator: offerings and schedules.
4. Student: progress and CGPA, then recommendations and planning.
5. Advisor: notes, plan review, and feedback.
6. Combine the modules, review validation, and rehearse explanations.

Before each module, explain the relevant HMS concepts. Keep changes small and record actual results. Later modules must decide their temporary-data handling explicitly; this draft promises no cross-page saving or real authentication.
