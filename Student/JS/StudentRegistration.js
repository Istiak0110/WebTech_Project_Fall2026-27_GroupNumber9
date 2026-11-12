function validateStudentID()
{
    let studentID = document.getElementById("StudentID").value.trim();
    if (!/^[0-9]{2}-[0-9]{5}-[1-3]$/.test(studentID))
    {
        showError("StudentID", "Use the format 26-12346-3. The last digit must be 1, 2 or 3.");
        return false;
    }
    if (studentID === "26-12345-3")
    {
        showError("StudentID", "This ID is already used by the sample student.");
        return false;
    }
    for (let i = 0; i < registeredAccounts.length; i++)
    {
        if (registeredAccounts[i].id === studentID)
        {
            showError("StudentID", "This student ID has already been registered on this page.");
            return false;
        }
    }
    clearError("StudentID");
    return true;
}

function validateStudentEmail()
{
    return validateRegistrationEmail("StudentEmail");
}

function validateStudentRegistrationForm()
{
    clearRegistrationResult();
    // Check each field first so all errors appear together.
    let validName = validateName("StudentName");
    let validID = validateStudentID();
    let validEmail = validateStudentEmail();
    let validPhone = validatePhone("StudentPhone");
    let validProgram = validateSelect("StudentProgram", programs, "a program");
    let validSemester = validateSelect("StudentSemester", semesters, "a semester");
    let validPassword = validatePassword("StudentPassword");
    let validConfirm = validateConfirmPassword("StudentPassword", "ConfirmPassword");
    let isValid = validName && validID && validEmail && validPhone &&
                  validProgram && validSemester && validPassword && validConfirm;
    if (isValid)
    {
        let student = {
            role: "student",
            name: document.getElementById("StudentName").value.trim(),
            id: document.getElementById("StudentID").value.trim(),
            email: document.getElementById("StudentEmail").value.trim().toLowerCase(),
            phone: document.getElementById("StudentPhone").value.trim(),
            program: document.getElementById("StudentProgram").value,
            semester: document.getElementById("StudentSemester").value,
            password: document.getElementById("StudentPassword").value
        };
        registeredAccounts.push(student);
        showResult("RegisterResult", true, "Registration successful for this frontend demo. Click Go to login and use the email and password you entered. No permanent account was created.");
        document.getElementById("GoToLogin").hidden = false;
    }
    else
    {
        showResult("RegisterResult", false, "Please correct the marked fields.");
        focusFirstError("RegistrationForm");
    }
    return false;
}

function clearRegistrationResult()
{
    clearResult("RegisterResult");
    document.getElementById("GoToLogin").hidden = true;
}

function resetRegistrationForm()
{
    clearFormErrors("RegistrationForm", "RegisterResult");
    clearRegistrationResult();
    document.getElementById("StudentPassword").type = "password";
    document.getElementById("ConfirmPassword").type = "password";
}
