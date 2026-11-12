# Milestone 1 code guide

The application runs in the browser. HTML describes the pages, CSS controls their appearance, and JavaScript checks fields and changes page content. There is no server-side code, database, or real sign-in system.

## How this follows the faculty sample

| Sample technique | StudyBuddy use |
|---|---|
| A shared `Design/Style.css` | One stylesheet keeps forms, navigation, cards, and messages consistent. |
| Separate role folders and `JS/` folders | Each role's HTML and matching page scripts are easy to locate. |
| Named functions in `Common.js` | A rule such as email validation is written once and called by multiple forms. |
| `onsubmit="return validate...()"` | The form calls a named page function. Returning `false` prevents a normal form submission. |
| Field-specific error paragraphs | A failed rule writes a useful message beside that field. |
| Boolean results and `if/else` | Each validator reports whether its field passed. |
| Loops over ordinary arrays | Demo roles, programs, records, and credentials are checked without a framework. |

The sample uses `innerHTML` with a text-escaping helper. StudyBuddy uses `textContent` for messages so a value is displayed as text. It does not need to build an HTML string from user input.

## Read the login flow

1. `JS/Index.js` routes a known role to `Login.html?role=...`.
2. `loadLoginPage()` reads that role with `URLSearchParams` and checks it against `demoRoles`. This small URL-reading technique extends the sample's navigation.
3. `validateLoginForm()` calls the shared role, email, and required-password checks separately.
4. When those checks pass, a `for` loop looks for the selected role's exact demo account. Email is trimmed and compared in lowercase; the password is compared exactly.
5. A match sets `window.location.href` to the account's dashboard. Otherwise a message is shown and the first invalid field receives focus.
6. The function returns `false` so the browser never sends the form to a backend.

These checks demonstrate a form workflow. Anyone can read the public demo credentials or open a dashboard directly; the checks do not protect information.

## Email validation, line by line

This is the actual `validateEmail()` function in `JS/Common.js`:

```javascript
function validateEmail(inputId, errorId)
{
    let value = document.getElementById(inputId).value.trim();
    let expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length > 254 || !expression.test(value))
    {
        showError(errorId, "Enter a valid email, such as name@example.com.");
        return false;
    }
    clearError(errorId);
    return true;
}
```

| Line | Explanation |
|---|---|
| 1 | Declare a reusable function. The caller supplies the input ID and its error-paragraph ID. |
| 2 | Open the function body. |
| 3 | Find the input, read its current value, and remove spaces at the beginning/end. This does not change the input's displayed value. |
| 4 | Store a regular expression: text without spaces or `@`, followed by `@`, another text part, a dot, and a final part. This is a practical classroom format check, not verification that an address exists. |
| 5 | `||` means “or.” Reject a value longer than 254 characters or one that does not match the expression. `!` means “not.” |
| 6 | Open the invalid-value branch. |
| 7 | Put the explanatory error beside this field. `showError()` also marks the related input as invalid for assistive technology. |
| 8 | Return `false` to the calling form function. |
| 9 | Close the invalid branch. |
| 10 | If the invalid branch did not return, remove any old error. |
| 11 | Return `true`: this field passed its format check. |
| 12 | Close the function. |

## Why every validator runs

Inside `validateStudentRegistrationForm()` in `Student/JS/StudentRegistration.js`, these statements run before `isValid` is calculated:

```javascript
let validName = validateName("FullName", "FullNameError");
let validID = validateStudentID();
let validEmail = validateStudentEmail();
let validPhone = validatePhone("Phone", "PhoneError");
let validProgram = validateSelect("Program", "ProgramError", demoPrograms, "a program");
let validSemester = validateSelect("Semester", "SemesterError", demoSemesters, "a semester");
let validPassword = validatePassword("Password", "PasswordError");
let validConfirm = validateConfirmPassword("Password", "ConfirmPassword", "ConfirmPasswordError");
let isValid = validName && validID && validEmail && validPhone && validProgram && validSemester && validPassword && validConfirm;
```

| Line | Explanation |
|---|---|
| 1 | Check the name and save its Boolean result. |
| 2 | Check the ID's project format and reject duplicate IDs. |
| 3 | Check the email format and reject duplicate student emails. |
| 4 | Check the optional phone; an empty value is allowed. |
| 5 | Require a program that exists in the allowed program array. |
| 6 | Require a semester that exists in the allowed semester array. |
| 7 | Check the registration password's length, uppercase, lowercase, and digit rules. Passwords are not trimmed. |
| 8 | Check that confirmation exactly matches the password. |
| 9 | `&&` means “and.” The complete form passes only if every saved result is `true`. |

Calling validators inside a single `&&` expression could stop at the first failure. Separate calls ensure later fields also show their errors. This matches the sample's approach.

`validateStudentID()` and `validateStudentEmail()` first call a common format checker. If the format is valid, a simple loop checks existing seed and temporary records. Email duplicate checks ignore case.

## How registration handles data

After validation, the form constructs a profile containing name, ID, email, phone, program, and semester. It intentionally leaves the password and confirmation out. `saveDemoStudent()` receives that profile and reports whether tab-session storage accepted it. The displayed message distinguishes a stored tab-session profile from a profile available only on the current page.

This actual helper in `JS/Demo.js` makes a new object with only the intended fields:

```javascript
function copyDemoProfile(profile)
{
    return {
        name: profile.name,
        id: profile.id,
        email: profile.email.toLowerCase(),
        phone: profile.phone,
        program: profile.program,
        semester: profile.semester
    };
}
```

| Line | Explanation |
|---|---|
| 1 | Accept a profile as the function's input. |
| 2 | Open the function. |
| 3 | Start returning a new object. |
| 4 | Copy its name. |
| 5 | Copy its student ID. |
| 6 | Copy the email in lowercase for consistent comparisons. |
| 7 | Copy the optional phone. |
| 8 | Copy the program. |
| 9 | Copy the semester. There are no password fields in this list. |
| 10 | Finish the returned object. |
| 11 | Close the function. |

## Browser storage is a new extension

The sample validates forms without keeping records. StudyBuddy adds `sessionStorage` so fictional profiles can follow navigation in the same tab and origin.

- `JSON.stringify(array)` converts an array of profiles to text suitable for storage.
- `JSON.parse(text)` converts that text back to JavaScript values.
- `try/catch` handles blocked storage, malformed JSON, and write failures without crashing the page.
- `isDemoProfile()` checks stored data before using it. Stored input is not automatically trusted.
- `loadDemoProfiles()` loads once per page; `getDemoStudents()` combines seed and temporary records.
- If loading/writing fails, the profile list stays in page memory and a message explains that navigation can lose new profiles.
- `resetDemoData()` removes only the `studybuddy.demo.profiles` key. It does not call `sessionStorage.clear()`, which would remove unrelated records.

Storage is temporary browser data. It is not permanent saving, real registration, or a shared class database. The published login accounts remain unchanged when a profile is registered.

## Feedback, correction, and reset

`showError()` uses an error ID ending in `Error` to locate its input, such as `EmailError` → `Email`. It writes text and sets `aria-invalid="true"`. `clearError()` removes both. The HTML connects the field and error using `aria-describedby`.

`focusFirstError()` selects the first input marked invalid and focuses it. `prepareFormFeedback()` listens for edits and clears the old overall result and Continue to Login link. Field errors stay visible until the next validation or reset, so useful guidance does not vanish while the student is typing.

`clearAllErrors()` loops through the error paragraphs and clears them. The page's reset function also restores password inputs to `type="password"`; the browser's normal form reset restores the fields and checkboxes.

Both forms start with their fieldsets disabled in HTML. The page-load function calls `enableFormFields()`, which loops over the fieldsets and sets `disabled` to `false`. If JavaScript is unavailable, the forms remain unavailable rather than falling back to an ordinary form submission with unusable validation. A normal Reset clears field values and feedback but leaves the fieldsets enabled.

## Finding and changing the right file

Change shared rules in `JS/Common.js`, a page-specific rule in its role's `JS/` folder, and fictional account/program options in `JS/Data.js`. Keep input IDs and corresponding error IDs consistent when editing HTML. Use `Design/Style.css` for layout changes so all pages remain consistent.

The stylesheet declares named colors in `:root`, such as `--green`, and reads them with `var(--green)`. Reusing those names makes a color change apply consistently. Grid rules arrange cards or fields into columns; for example, `grid-template-columns: 1fr 1fr` creates two equal columns. Media queries change those layouts on narrower screens. These are browser CSS features and require no UI library.

Later modules will explain numeric calculations, prerequisites, and time comparisons when they are introduced. Those features are not part of Milestone 1.
