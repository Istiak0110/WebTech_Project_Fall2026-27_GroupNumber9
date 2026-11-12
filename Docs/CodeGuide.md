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
