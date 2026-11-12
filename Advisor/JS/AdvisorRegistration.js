function validateAdvisorRegistrationForm()
{
    clearAdvisorRegistrationResult();
    // Run each check before combining the results so every field gets feedback.
    let validName = validateName("AdvisorName");
    let validID = validateStaffID("AdvisorID", /^FAC-[0-9]{4}$/, "FAC-1001");
    let validEmail = validateRegistrationEmail("AdvisorEmail");
    let validPhone = validatePhone("AdvisorPhone");
    let validDepartment = validateSelect("AdvisorDepartment", departments, "a department");
    let validDesignation = validateSelect("AdvisorDesignation", designations, "a designation");
    let validPassword = validatePassword("AdvisorPassword");
    let validConfirm = validateConfirmPassword("AdvisorPassword", "AdvisorConfirmPassword");
    let isValid = validName && validID && validEmail && validPhone &&
                  validDepartment && validDesignation && validPassword && validConfirm;
    if (isValid)
    {
        let advisor = {
            role: "advisor",
            name: document.getElementById("AdvisorName").value.trim(),
            id: document.getElementById("AdvisorID").value.trim(),
            email: document.getElementById("AdvisorEmail").value.trim().toLowerCase(),
            phone: document.getElementById("AdvisorPhone").value.trim(),
            department: document.getElementById("AdvisorDepartment").value,
            designation: document.getElementById("AdvisorDesignation").value,
            password: document.getElementById("AdvisorPassword").value
        };
        registeredAccounts.push(advisor);
        showResult("AdvisorResult", true, "Registration successful for this frontend demo. Click Go to login and use the details you entered. No permanent account was created.");
        document.getElementById("AdvisorGoToLogin").hidden = false;
    }
    else
    {
        showResult("AdvisorResult", false, "Please correct the marked fields.");
        focusFirstError("AdvisorRegistrationForm");
    }
    return false;
}

function clearAdvisorRegistrationResult()
{
    clearResult("AdvisorResult");
    document.getElementById("AdvisorGoToLogin").hidden = true;
}

function resetAdvisorRegistrationForm()
{
    clearFormErrors("AdvisorRegistrationForm", "AdvisorResult");
    clearAdvisorRegistrationResult();
    document.getElementById("AdvisorPassword").type = "password";
    document.getElementById("AdvisorConfirmPassword").type = "password";
}
