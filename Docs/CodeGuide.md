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

Like the HMS sample, `Style.css` uses a `--theme` color. Each role class also sets `--theme-dark` for hover states and `--theme-light` for table headings. For example, `<body class="advisor">` applies the green Advisor theme. Buttons and links use `var(--theme)` so their colors stay consistent.

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

## Version 3 shared academic data

`JS/AcademicData.js` contains fictional arrays. Each dashboard loads that file after `Common.js` and before its own script. `getAcademicCourse(code)` and `getAcademicStudent(id)` use a `for` loop to return a matching object or `null`. `getSemesterCourses(semester)` reads the offerings and returns each offered course only once.

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

In `recommendCourses()`, the completed checkbox values form an array of course codes. The loop checks every sample course:

1. If its code is already completed, label it Already completed.
2. Otherwise, if it has a prerequisite missing from that array, label it Not eligible and name the missing course.
3. Otherwise, label it Eligible and explain whether no prerequisite is needed or the prerequisite is completed.

For example, selecting CSE102 makes CSE201 and CSE202 eligible under the sample rules, while CSE301 still needs CSE202. Selecting no completed courses is valid and shows only prerequisite-free courses as eligible. These are explicit `if/else` rules, not AI. The planner separately checks offered selections and credit totals; it does not apply these prerequisite rules automatically.

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
