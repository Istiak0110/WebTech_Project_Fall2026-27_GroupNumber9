let registrationAttempt = 0;

function cancelRegistrationAttempt()
{
    registrationAttempt++;
}

function loadRegistrationPage()
{
    enableFormFields();
    initializeDemoStatus();
    prepareFormFeedback();
    let form = document.querySelector("form");
    form.addEventListener("input", cancelRegistrationAttempt);
    form.addEventListener("change", cancelRegistrationAttempt);
}

function validateStudentID()
{
    let valid = validatePattern("StudentID", "StudentIDError", /^[0-9]{2}-[0-9]{5}-[1-3]$/, "Use the project ID format YY-NNNNN-S, such as 26-12346-3 (S is 1–3).");
    if (!valid)
    {
        return false;
    }
    let studentID = document.getElementById("StudentID").value.trim();
    let students = getDemoStudents();
    for (let i = 0; i < students.length; i++)
    {
        if (students[i].id === studentID)
        {
            showError("StudentIDError", "This student ID already exists in the demo records.");
            return false;
        }
    }
    return true;
}

function validateStudentEmail()
{
    if (!validateEmail("Email", "EmailError"))
    {
        return false;
    }
    let email = document.getElementById("Email").value.trim().toLowerCase();
    for (let i = 0; i < demoAccounts.length; i++)
    {
        if (demoAccounts[i].email === email)
        {
            showError("EmailError", "This email belongs to a sample account. Use a different fictional email.");
            return false;
        }
    }
    let students = getDemoStudents();
    for (let i = 0; i < students.length; i++)
    {
        if (students[i].email.toLowerCase() === email)
        {
            showError("EmailError", "This email already exists in the demo student records.");
            return false;
        }
    }
    return true;
}

function validateStudentRegistrationForm()
{
    registrationAttempt++;
    let attempt = registrationAttempt;
    clearFormResult();
    // Separate calls mean all fields are checked, even when the first is invalid.
    let validName = validateName("FullName", "FullNameError");
    let validID = validateStudentID();
    let validEmail = validateStudentEmail();
    let validPhone = validatePhone("Phone", "PhoneError");
    let validProgram = validateSelect("Program", "ProgramError", demoPrograms, "a program");
    let validSemester = validateSelect("Semester", "SemesterError", demoSemesters, "a semester");
    let validPassword = validatePassword("Password", "PasswordError");
    let validConfirm = validateConfirmPassword("Password", "ConfirmPassword", "ConfirmPasswordError");
    let isValid = validName && validID && validEmail && validPhone && validProgram && validSemester && validPassword && validConfirm;
    if (isValid)
    {
        if (window.location.protocol === "file:")
        {
            showResult(false, "Your details passed validation. To create a demo login, open the project with a static preview such as VS Code Live Server and register there. Direct HTML files do not reliably share temporary accounts.");
            return false;
        }
        let profile = {
            name: document.getElementById("FullName").value.trim(),
            id: document.getElementById("StudentID").value.trim(),
            email: document.getElementById("Email").value.trim().toLowerCase(),
            phone: document.getElementById("Phone").value.trim(),
            program: document.getElementById("Program").value,
            semester: document.getElementById("Semester").value
        };
        let password = document.getElementById("Password").value;
        document.getElementById("ResultText").textContent = "Preparing your temporary demo account…";
        makeDemoPasswordHash(password).then(function (hash)
        {
            // Ignore a result if the user edited, reset, or submitted again while it ran.
            if (attempt !== registrationAttempt)
            {
                return;
            }
            profile.passwordHash = hash;
            if (saveDemoStudent(profile))
            {
                showResult(true, "Your temporary student demo account is ready. Continue to login, choose Student, and use the email and password you just entered. It works in this tab at this site address; no real account was created.");
                document.getElementById("ContinueLogin").hidden = false;
            }
            else
            {
                showResult(false, "Your details are valid, but browser storage could not save the demo account. No new login was created. Enable temporary browser storage or reset demo profiles on the home page, then try again. You can still use a sample account.");
            }
            initializeDemoStatus();
        }).catch(function ()
        {
            if (attempt === registrationAttempt)
            {
                showResult(false, "The browser could not prepare the demo password check. No account was created. Use a current browser with a static preview, or use a sample account.");
            }
        });
    }
    else
    {
        showResult(false);
        focusFirstError();
    }
    return false;
}

function resetRegistrationForm()
{
    cancelRegistrationAttempt();
    clearAllErrors();
    document.getElementById("Password").type = "password";
    document.getElementById("ConfirmPassword").type = "password";
}
