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
function showRegistration()
{
    document.getElementById("login").hidden = true;
    document.getElementById("register").hidden = false;
    document.getElementById("StudentName").focus();
}
```

| Line | Meaning |
|---|---|
| 1–2 | Define the function and open its body. |
| 3 | Hide the login section. |
| 4 | Show the registration section in the same document. |
| 5 | Move keyboard focus to the name field. |
| 6 | Close the function. |

## Temporary registration and login

`JS/Data.js` starts with `let registeredStudents = [];`: an empty array. After valid registration, the page builds a `student` object from the fields and calls `registeredStudents.push(student);`. `push()` adds that object to the array.

`showLogin()` changes the visible section without loading another page. It fills the Student role and latest registered email, then clears the login password so the user enters it again.

`validateLoginForm()` checks the public sample accounts first. A `for` loop then checks the temporary array. The email is trimmed and compared in lowercase; the password must match exactly. A registered account can open only the Student dashboard. A match changes `window.location.href` to that dashboard's HTML file.

The temporary array, including its demo passwords, exists only in page memory. Refreshing or leaving Login.html clears it. This is a classroom example, not secure authentication, permanent saving, or a database. Use fictional details and a practice password.

## Reset and edits

`clearFormErrors()` loops over one form's error paragraphs and controls. It removes error text and invalid flags. The form's reset handler also restores password fields to hidden; the browser resets the input values. Editing registration clears its old success message and Go to login action, without deleting an already registered temporary account.

Both forms start disabled and are enabled by `loadLoginPage()`. If JavaScript cannot run, the fields stay unavailable instead of submitting without validation. The compatibility page `Student/StudentRegistration.html` opens `Login.html#register`.

For changes, edit common rules in `JS/Common.js`, registration rules in `Student/JS/StudentRegistration.js`, sample accounts in `JS/Data.js`, and styles in `Design/Style.css`. Keep input IDs and their matching error IDs together.
