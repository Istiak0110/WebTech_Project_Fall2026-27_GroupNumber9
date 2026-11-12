# Code guide

HTML contains the fields and page content. CSS sets their appearance. JavaScript reads values, checks them, and shows results. The shared stylesheet, fieldsets, named functions, and validation calls follow the faculty's HMS sample.

## Shared validation

This actual function is in `JS/Common.js`:

```javascript
function validateEmail(inputId)
{
    let email = document.getElementById(inputId).value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    {
        showError(inputId, "Enter a valid email address, such as name@example.com.");
        return false;
    }
    clearError(inputId);
    return true;
}
```

| Line | Meaning |
|---|---|
| 1–2 | Define a function that receives the input's ID and open its body. |
| 3 | Find the field, read its value, and remove spaces at its ends. |
| 4 | Check the email pattern. `!` means the pattern did not match. This checks format, not whether the email exists. |
| 5–8 | Show the field's error and return `false` when the format is wrong. |
| 9 | Remove an earlier error when the field passes. |
| 10–11 | Return `true` and close the function. |

`showError()` writes to an error paragraph such as `StudentEmailError` using `textContent`. The paragraph displays text without interpreting it as HTML. It also marks the field with `aria-invalid`.

Each form calls every validator separately, stores its Boolean result, then combines those results with `&&`. That means all invalid fields get messages together. Returning `false` from the submit function stops ordinary submission to a server.

## Showing registration

This actual function is in `JS/Login.js`:

```javascript
function hideRegistrationForms()
{
    document.getElementById("register").hidden = true;
    document.getElementById("register-advisor").hidden = true;
    document.getElementById("register-coordinator").hidden = true;
}
```

| Line | Meaning |
|---|---|
| 1–2 | Define the function and open its body. |
| 3 | Hide Student Registration. |
| 4 | Hide Faculty Advisor Registration. |
| 5 | Hide Academic Coordinator Registration. |
| 6 | Close the function. |

`showRegistration(role)` calls this helper, selects the requested role and theme, then shows only that role's form and focuses its name field. It accepts Student, Faculty Advisor, or Academic Coordinator. Administrator returns to login instead of opening registration.

`updateRegistrationLink(role)` uses ordinary `if/else` branches to change the prompt and link target for the selected role. Administrator hides both public registration links and shows the institution-assigned account message. An empty role shows a selection hint.

## Role colors and logo

Like the HMS sample, `Style.css` uses a `--theme` color. Each role class also sets `--theme-dark` for hover states and `--theme-light` for table headings. For example, `<body class="advisor">` applies the green Advisor theme. Public login and registration keep these role colors. Version 4 adds `Design/Dashboard.css` after the original stylesheet: its dashboard-only rules give all four dashboards the screenshot's consistent navy sidebar and blue controls.

`updateRoleTheme()` reads the selected role, checks it against the `roles` array, and sets `document.body.className`. It also updates the registration prompt. It runs when login opens or the role changes. Each registration form uses its own role's theme. Reset restores the neutral color and selection hint because the role select returns to its empty first option.

The header's ordinary `<img>` element loads `Images/StudyBuddyLogo.png`. Root pages use that path; role pages use `../Images/StudyBuddyLogo.png` to go up one folder first. The image has a transparent background and needs no library or extra code.

## Temporary registration and login

`JS/Data.js` starts with `let registeredAccounts = [];`: an empty array. After valid registration, a form builds an object containing its fields and a fixed `role`, then uses `push()` to add that object to the array.

Each Go to login button calls `showLogin()` with its form's role, such as `showLogin('advisor')`. The function finds the latest account for that role, fills its role/email, and clears the password for re-entry. Calling `showLogin()` without a role simply returns to login with the current role preserved.

`validateLoginForm()` checks the public sample accounts first. A `for` loop then checks the temporary array. Email is trimmed and compared in lowercase; the password and selected role must match. `getDashboardPage(role)` supplies the matching dashboard path. This prevents an Advisor account from opening a Coordinator dashboard through the login form.

All three forms call `validateRegistrationEmail()` to reject duplicate emails across sample and temporary accounts. Advisor and Coordinator call `validateStaffID()` with their own ID pattern. Their scripts use the same separate-checks-then-`&&` style as Student. Coordinator also checks that an academic year's ending digits represent the next year. These are project validation rules, not verification of official AIUB records.

The temporary array, including its demo passwords, exists only in page memory. Refreshing or leaving Login.html clears it. This is a classroom example, not secure authentication, permanent saving, or a database. Use fictional details and a practice password.

## Reset and edits

`clearFormErrors()` loops over one form's error paragraphs and controls. It removes error text and invalid flags. The form's reset handler also restores password fields to hidden; the browser resets the input values. Editing registration clears its old success message and Go to login action, without deleting an already registered temporary account.

All four forms start disabled and are enabled by `loadLoginPage()`. If JavaScript cannot run, the fields stay unavailable instead of submitting without validation. The Student, Advisor, and Coordinator registration entry pages open their matching sections in `Login.html`.

For changes, edit common rules in `JS/Common.js`, each role's registration rules in its own `JS/` folder, sample accounts in `JS/Data.js`, and styles in `Design/Style.css`. Keep input IDs and their matching error IDs together.

## Shared academic data and the Version 4 extension

`JS/AcademicData.js` contains the original Version 3 fictional arrays. Each dashboard loads that file after `Common.js`, then `Version4Data.js`, the shared navigation script, and its own role script. The Student page also loads `StudentFeatures.js`. Ordinary script tags preserve this order without modules, imports, a server, or network requests.

`getAcademicCourse(code)` and `getAcademicStudent(id)` use a `for` loop to return a matching object or `null`. `getSemesterCourses(semester)` reads the offerings and returns each offered course only once. `Version4Data.js` extends the original catalog into a complete fictional curriculum rather than replacing the V3 account and form scripts.

Edit `semesterCreditLimit` to change the demo limit, initially 18. `academicGrades` supplies the displayed sample scale. Neither setting is presented as official AIUB policy. A fresh page creates fresh arrays: adding a course on Admin does not update another dashboard after navigation.

## Weighted GPA, line by line

These statements appear in `calculateStudentGPA()` in `Student/JS/StudentDashboard.js`. The first two run for each valid course; the last runs after the loop:

```javascript
totalCredits = totalCredits + credits;
totalPoints = totalPoints + credits * academicGrades[j].points;
document.getElementById("GPAValue").textContent = (totalPoints / totalCredits).toFixed(2);
```

| Line | Meaning |
|---|---|
| 1 | Add the course's credits to the running credit total. |
| 2 | Multiply that course's credits by its grade points and add the weighted result. |
| 3 | Divide the accumulated points by credits and display two decimal places. Validation prevents a zero denominator. |

For example, 3 credits at A+ (4.00) and 1 credit at B (3.25) produce `(3 × 4.00 + 1 × 3.25) / 4 = 3.8125`, displayed as **3.81**. Averaging the two grade values directly would ignore their different credits. The code rounds only the displayed final result.

`addCourseRow()` builds each row with labels, inputs, a grade dropdown, and error paragraphs. Its number gives every control a unique ID. `gpaRowIds` keeps the active row numbers; removal deletes the row and its number. Reset creates one empty row. Edits clear old calculated output so it does not look current after inputs change.

## Prerequisite rules

`getCourseEligibility(code, completed)` in `JS/Version4Data.js` receives a course code and an array of completed codes. Its steps are:

1. Look up the course; an unknown code returns an ineligible result.
2. Read its prerequisite list. Older courses with one `prerequisite` are treated as a one-item list.
3. Count credits for unique, known completed courses.
4. Loop over every required prerequisite and collect missing codes.
5. Check already completed, missing prerequisites, and insufficient earned credits in that order.
6. Only mark the course eligible after all these checks pass.

For example, Web Technologies (`CSE301`) needs `CSE202`, `CSE201`, `CSE103`, and at least 60 earned credits. Amina's fixed sample profile meets those rules. Capstone Project I (`CSE401`) needs 90 earned credits, so her 78 credits are insufficient even though its prerequisite is completed.

The Prerequisite Checker and recommendation cards use Amina's sample profile. The retained `recommendCourses()` checkbox form uses the user's selected codes as a what-if input; it calls the same rules but does not modify the transcript. Selecting no completed courses is valid. These are explicit JavaScript rules, not AI.

`addRecommendationToPlan(code)` rechecks sample eligibility and availability, prevents duplicate selections and totals above 18 credits, then checks the matching planner checkbox and updates its totals. It refuses to discard a nonempty plan for another semester. The original checkbox planner separately checks offerings and credit totals; it does not run a full prerequisite or timetable-conflict audit.

## Reusable numeric and checkbox checks

`validateNumber(inputId, label, min, max, whole)` rejects an empty value or a number that is not finite. When `whole` is true, `Number.isInteger()` rejects fractions. It then checks the supplied limits and returns a Boolean. Credits use 1–4; offering seats use 1–60.

`getCheckedValues(groupName)` finds the group's checkbox inputs, loops through them, and adds each checked `.value` to an array using `push()`. `validateCheckboxes()` checks that array's length against a minimum. The module then confirms each selected code really belongs to its allowed course list, rather than trusting the value alone.

`validateTextLength()` trims text and checks a minimum and maximum. Advisor comments normally need 10–500 characters. If status is Needs Revision, a second `if` requires at least 30 characters so the requested changes have an explanation.

## Updating a table

This actual helper from `Admin/JS/AdminDashboard.js` adds one table cell:

```javascript
function addAdminCell(row, text)
{
    let cell = document.createElement("td");
    cell.textContent = text;
    row.appendChild(cell);
}
```

| Line | Meaning |
|---|---|
| 1–2 | Receive the row and its cell text, then open the function. |
| 3 | Create a new HTML table cell in memory. |
| 4 | Set its displayed text without interpreting user text as HTML. |
| 5 | Attach the cell to the row. |
| 6 | Close the helper. |

The module's outer loop creates one row for each matching record. Catalog additions, search results, advising notes, plan status changes, and offering filters update the current page this way. No request is sent to a server and none of these updates is a permanent save.

## Version 4 section navigation

Each tool is an ordinary `<section>` with an ID and `data-dashboard-section`. A sidebar anchor points to its ID, such as `href="#semester-planner"`. `JS/Dashboard.js` selects the matching section and hides the others; it also updates the page title and active link. The sections stay in the same HTML document, so their current form values stay in memory when switching tools.

`initializeDashboard("overview")` starts each dashboard on its overview unless the URL contains a valid section hash. `showDashboardSection("semester-planner")` is also called after a recommendation is added. The mobile menu button calls `toggleDashboardSidebar()`. These are small named functions using DOM properties and loops, the same approach used for showing registration forms.

`data-title` and `data-description` are custom HTML attributes. They store a section's heading and short description so the script can update the shared header without maintaining another list of names. Read-only Admin prerequisite and graduation views deliberately offer **View** navigation rather than claiming an unimplemented rule editor.

## Version 4 progress calculations

`getDemoProgress(studentId)` loops through the fixed curriculum and its Core, Major, and Elective categories. It adds required credits for every curriculum course and completed credits only when that course appears in the student's completed list. It then reads the same student's grade records and calculates a credit-weighted GPA.

These three lines from the function finish the calculation:

```javascript
result.remaining = result.totalCredits - result.credits;
result.percent = result.totalCredits > 0 ? Math.round(result.credits * 100 / result.totalCredits) : 0;
result.gpa = result.credits > 0 ? weighted / result.credits : 0;
```

| Line | Meaning |
|---|---|
| 1 | Subtract earned credits from required credits to find what remains. |
| 2 | If required credits are positive, calculate a whole-number percentage; otherwise use zero. `condition ? value : otherValue` is a short `if/else` expression. |
| 3 | Divide weighted grade points by earned credits when that denominator is positive; otherwise use zero. |

`renderStudentOverview()` and `renderGraduationTracker()` display these returned values. This gives Amina 78/120 credits, 65% completion, 42 remaining credits, and GPA 3.52 everywhere. Adding a new catalog course does not silently add it to the fixed degree curriculum.

## Predefined Academic Assistant

`askAcademicAssistant()` validates the question before displaying it. `getAcademicAssistantReply(question)` first recognizes a sample course code, then checks words such as `gpa`, `prerequisite`, `semester`, and `graduation` using `indexOf()`. Each branch returns a predefined sentence, sometimes including the current sample totals. Unrecognized text gets a response listing the supported topics.

`appendAssistantMessage()` creates a paragraph and sets `textContent`, so entered text is displayed as text. Suggested questions call the same submit function; they are working shortcuts. Clear conversation removes the page's conversation and restores its greeting. There is no AI integration, external API, stored chat history, or interpretation of official student records.
