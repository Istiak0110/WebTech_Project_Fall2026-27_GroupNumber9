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
4. When those checks pass, a `for` loop first looks for the selected role's public demo account. Email is trimmed and compared in lowercase; the password is compared exactly.
5. If no public account matches, `getRegisteredDemoStudent(email)` looks for a temporary registered profile. It requires the Student role and a saved `passwordHash`. A profile from the older draft receives reset/re-registration instructions.
6. For a registered profile, `makeDemoPasswordHash(password)` prepares a comparison value from the entered password. Its `.then()` callback compares the result with the saved verifier. Only a match opens `Student/StudentDashboard.html`; a wrong password shows an error.
7. `window.location.href` changes the page after a successful sample or registered check. The form function returns `false` immediately, including while a password check is pending, so the browser never sends credentials to a backend.

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

`validateStudentID()` and `validateStudentEmail()` first call a common format checker. If the format is valid, a simple loop checks existing seed and temporary records. Email duplicate checks ignore case. Registration also reserves all four public sample email addresses.

## How registration handles data

After field validation, registration checks that the project is open through a static preview rather than `file://`. It constructs a profile containing name, ID, email, phone, program, and semester. It calls the browser's password helper and adds the resulting verifier as `passwordHash`. The raw password and confirmation are left out.

`saveDemoStudent()` builds an updated list and attempts the storage write before replacing the active in-memory list. If preparation or storage fails, the page reports the problem and creates no new login. Continue to Login appears only after success. `copyDemoProfile()` explicitly copies the six profile fields plus the optional verifier; `isDemoProfile()` accepts only a verifier with 64 lowercase hexadecimal characters when one is present. It also accepts legacy profiles without a verifier so login can explain how to reset and register again.

## Native password comparison value, line by line

The sample does not implement reusable registered logins. This correction introduces one browser API and asynchronous callbacks. A Promise represents a result that will arrive later. `.then()` handles the successful result and `.catch()` handles a failure. The form stays on the page while the browser prepares the result.

This is the actual helper in `JS/Demo.js`:

```javascript
function makeDemoPasswordHash(password)
{
    if (!window.crypto || !window.crypto.subtle || typeof TextEncoder === "undefined")
    {
        return Promise.reject(new Error("Demo password checks need a supported browser and static preview."));
    }
    let encoded = new TextEncoder().encode(password);
    return window.crypto.subtle.digest("SHA-256", encoded).then(function (buffer)
    {
        let bytes = new Uint8Array(buffer);
        let hash = "";
        for (let i = 0; i < bytes.length; i++)
        {
            let part = bytes[i].toString(16);
            if (part.length === 1)
            {
                part = "0" + part;
            }
            hash = hash + part;
        }
        return hash;
    });
}
```

| Line | Explanation |
|---|---|
| 1 | Declare the named helper with the entered password as its argument. |
| 2 | Open the function. |
| 3 | Check whether the browser provides Web Crypto and text encoding. `!` means “not.” |
| 4 | Open the missing-feature branch. |
| 5 | Return a failed Promise with a useful message; the calling form handles it in `.catch()`. |
| 6 | Close that branch. |
| 7 | Convert the entered text to bytes using the browser's `TextEncoder`. |
| 8 | Ask the browser's native SHA-256 function to produce a digest. `.then()` receives its result as `buffer`. |
| 9 | Open the successful-result callback. |
| 10 | Read the buffer as an ordinary sequence of byte values using `Uint8Array`. |
| 11 | Start an empty string for the comparison value. |
| 12 | Loop through all digest bytes. |
| 13 | Open the loop body. |
| 14 | Convert the byte to base-16 text, called hexadecimal. |
| 15 | Check whether that text has only one character. |
| 16 | Open the one-character branch. |
| 17 | Add a leading zero so every byte contributes two characters. |
| 18 | Close the branch. |
| 19 | Append the two-character part to the result. |
| 20 | Close the loop. |
| 21 | Return the 64-character verifier from the callback. |
| 22 | Close `.then()`; the helper returns its Promise to the form. |
| 23 | Close the helper. |

The application does not implement a cryptographic algorithm itself or add a library. The verifier is a browser-local comparison value, not a claim of secure password storage or real authentication. The entered password and confirmation never enter saved profile data.

Both form scripts keep an attempt number. Starting a submission remembers the current number; edits, Reset, filling a sample account, or another submission increment it. A delayed `.then()` or `.catch()` result checks that number before saving a profile, showing feedback, or redirecting. This prevents an older result from acting on a form the user has already changed.

## Browser storage is a new extension

The sample validates forms without keeping records. StudyBuddy adds `sessionStorage` so fictional profiles can follow navigation in the same tab and origin.

- `JSON.stringify(array)` converts an array of profiles to text suitable for storage.
- `JSON.parse(text)` converts that text back to JavaScript values.
- `try/catch` handles blocked storage, malformed JSON, and write failures without crashing the page.
- `isDemoProfile()` checks stored data before using it. Stored input is not automatically trusted.
- `loadDemoProfiles()` loads once per page; `getDemoStudents()` combines seed and temporary records.
- If loading or writing fails, registration reports that no new demo login was created. There is no successful page-memory-only account fallback.
- `resetDemoData()` removes only the `studybuddy.demo.profiles` key. It does not call `sessionStorage.clear()`, which would remove unrelated records.

Storage is temporary browser data. A registered Student login works only at the same site address in the same tab session. Use a static preview such as VS Code Live Server for this flow; direct HTML files continue to support sample logins. Reset Demo Profiles removes registered logins. This is not permanent saving, real registration, or a shared class database. The four published sample accounts remain unchanged.

## Feedback, correction, and reset

`showError()` uses an error ID ending in `Error` to locate its input, such as `EmailError` → `Email`. It writes text and sets `aria-invalid="true"`. `clearError()` removes both. The HTML connects the field and error using `aria-describedby`.

`focusFirstError()` selects the first input marked invalid and focuses it. `prepareFormFeedback()` listens for edits and clears the old overall result and Continue to Login link. Field errors stay visible until the next validation or reset, so useful guidance does not vanish while the student is typing.

`clearAllErrors()` loops through the error paragraphs and clears them. The page's reset function also restores password inputs to `type="password"`; the browser's normal form reset restores the fields and checkboxes.

Both forms start with their fieldsets disabled in HTML. The page-load function calls `enableFormFields()`, which loops over the fieldsets and sets `disabled` to `false`. If JavaScript is unavailable, the forms remain unavailable rather than falling back to an ordinary form submission with unusable validation. A normal Reset clears field values and feedback but leaves the fieldsets enabled.

## Finding and changing the right file

Change shared rules in `JS/Common.js`, a page-specific rule in its role's `JS/` folder, and fictional account/program options in `JS/Data.js`. Keep input IDs and corresponding error IDs consistent when editing HTML. Use `Design/Style.css` for layout changes so all pages remain consistent.

The stylesheet declares named colors in `:root`, such as `--green`, and reads them with `var(--green)`. Reusing those names makes a color change apply consistently. Grid rules arrange cards or fields into columns; for example, `grid-template-columns: 1fr 1fr` creates two equal columns. Media queries change those layouts on narrower screens. These are browser CSS features and require no UI library.

Later modules will explain numeric calculations, prerequisites, and time comparisons when they are introduced. Those features are not part of Milestone 1.
