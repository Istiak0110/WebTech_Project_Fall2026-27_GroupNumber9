function validateCoordinatorYear()
{
    let year = document.getElementById("CoordinatorYear").value.trim();
    if (!/^[0-9]{4}-[0-9]{2}$/.test(year))
    {
        showError("CoordinatorYear", "Use the academic year format 2026-27.");
        return false;
    }
    let parts = year.split("-");
    let startYear = Number(parts[0]);
    let endYear = Number(parts[1]);
    if (startYear < 2020 || startYear > 2100 || endYear !== (startYear + 1) % 100)
    {
        showError("CoordinatorYear", "Use consecutive years, such as 2026-27, with a start year from 2020 to 2100.");
        return false;
    }
    clearError("CoordinatorYear");
    return true;
}

function validateCoordinatorRegistrationForm()
{
    clearCoordinatorRegistrationResult();
    let validName = validateName("CoordinatorName");
    let validID = validateStaffID("CoordinatorID", /^COR-[0-9]{4}$/, "COR-1001");
    let validEmail = validateRegistrationEmail("CoordinatorEmail");
    let validPhone = validatePhone("CoordinatorPhone");
    let validDepartment = validateSelect("CoordinatorDepartment", departments, "a department");
    let validTerm = validateSelect("CoordinatorTerm", terms, "an assigned semester");
    let validYear = validateCoordinatorYear();
    let validPassword = validatePassword("CoordinatorPassword");
    let validConfirm = validateConfirmPassword("CoordinatorPassword", "CoordinatorConfirmPassword");
    let isValid = validName && validID && validEmail && validPhone && validDepartment &&
                  validTerm && validYear && validPassword && validConfirm;
    if (isValid)
    {
        let coordinator = {
            role: "coordinator",
            name: document.getElementById("CoordinatorName").value.trim(),
            id: document.getElementById("CoordinatorID").value.trim(),
            email: document.getElementById("CoordinatorEmail").value.trim().toLowerCase(),
            phone: document.getElementById("CoordinatorPhone").value.trim(),
            department: document.getElementById("CoordinatorDepartment").value,
            term: document.getElementById("CoordinatorTerm").value,
            academicYear: document.getElementById("CoordinatorYear").value.trim(),
            password: document.getElementById("CoordinatorPassword").value
        };
        registeredAccounts.push(coordinator);
        showResult("CoordinatorResult", true, "Registration successful for this frontend demo. Click Go to login and use the details you entered. No permanent account was created.");
        document.getElementById("CoordinatorGoToLogin").hidden = false;
    }
    else
    {
        showResult("CoordinatorResult", false, "Please correct the marked fields.");
        focusFirstError("CoordinatorRegistrationForm");
    }
    return false;
}

function clearCoordinatorRegistrationResult()
{
    clearResult("CoordinatorResult");
    document.getElementById("CoordinatorGoToLogin").hidden = true;
}

function resetCoordinatorRegistrationForm()
{
    clearFormErrors("CoordinatorRegistrationForm", "CoordinatorResult");
    clearCoordinatorRegistrationResult();
    document.getElementById("CoordinatorPassword").type = "password";
    document.getElementById("CoordinatorConfirmPassword").type = "password";
}
