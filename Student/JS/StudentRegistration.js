function loadRegistrationPage()
{
    enableFormFields();
    initializeDemoStatus();
    prepareFormFeedback();
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
        let profile = {
            name: document.getElementById("FullName").value.trim(),
            id: document.getElementById("StudentID").value.trim(),
            email: document.getElementById("Email").value.trim().toLowerCase(),
            phone: document.getElementById("Phone").value.trim(),
            program: document.getElementById("Program").value,
            semester: document.getElementById("Semester").value
        };
        let stored = saveDemoStudent(profile);
        let message = "Registration passed validation. A temporary demo profile is available in this tab. No real account was created; continue with the published student demo login.";
        if (!stored)
        {
            message = "Registration passed validation, but browser storage was unavailable. The demo profile is kept on this page only and will be lost after navigation. No real account was created; continue with the published student demo login.";
        }
        showResult(true, message);
        document.getElementById("ContinueLogin").hidden = false;
        initializeDemoStatus();
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
    clearAllErrors();
    document.getElementById("Password").type = "password";
    document.getElementById("ConfirmPassword").type = "password";
}
