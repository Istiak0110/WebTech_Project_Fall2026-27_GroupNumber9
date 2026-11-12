let loginAttempt = 0;

function cancelLoginAttempt()
{
    loginAttempt++;
}

function loadLoginPage()
{
    enableFormFields();
    // URLSearchParams reads the role selected on the home page.
    let parameters = new URLSearchParams(window.location.search);
    let role = parameters.get("role");
    for (let i = 0; i < demoRoles.length; i++)
    {
        if (role === demoRoles[i])
        {
            document.getElementById("Role").value = role;
        }
    }
    prepareFormFeedback();
    initializeDemoStatus();
    let form = document.querySelector("form");
    form.addEventListener("input", cancelLoginAttempt);
    form.addEventListener("change", cancelLoginAttempt);
}

function fillDemoAccount()
{
    cancelLoginAttempt();
    clearAllErrors();
    let role = document.getElementById("Role").value;
    for (let i = 0; i < demoAccounts.length; i++)
    {
        if (role === demoAccounts[i].role)
        {
            document.getElementById("Email").value = demoAccounts[i].email;
            document.getElementById("Password").value = demoAccounts[i].password;
            return;
        }
    }
    showError("RoleError", "Select a role before filling its demo account.");
    focusFirstError();
}

function validateLoginForm()
{
    loginAttempt++;
    let attempt = loginAttempt;
    clearFormResult();
    let validRole = validateSelect("Role", "RoleError", demoRoles, "a role");
    let validEmail = validateEmail("Email", "EmailError");
    let validPassword = validateRequired("Password", "PasswordError", "the demo password");
    let isValid = validRole && validEmail && validPassword;
    if (isValid)
    {
        let role = document.getElementById("Role").value;
        let email = document.getElementById("Email").value.trim().toLowerCase();
        let password = document.getElementById("Password").value;
        for (let i = 0; i < demoAccounts.length; i++)
        {
            if (role === demoAccounts[i].role && email === demoAccounts[i].email && password === demoAccounts[i].password)
            {
                window.location.href = demoAccounts[i].dashboard;
                return false;
            }
        }
        let student = getRegisteredDemoStudent(email);
        if (student)
        {
            if (role !== "student")
            {
                showError("RoleError", "Registered demo accounts use the Student role. Select Student and try again.");
                showResult(false);
                focusFirstError();
                return false;
            }
            if (!student.passwordHash)
            {
                showResult(false, "This profile was created with the older draft and has no demo password. Reset demo profiles on the home page, then register again to create a temporary login.");
                return false;
            }
            if (window.location.protocol === "file:")
            {
                showResult(false, "Registered demo logins need a static preview such as VS Code Live Server. Open the project there and register again in the same tab.");
                return false;
            }
            document.getElementById("ResultText").textContent = "Checking your temporary student account…";
            makeDemoPasswordHash(password).then(function (hash)
            {
                if (attempt !== loginAttempt)
                {
                    return;
                }
                if (hash === student.passwordHash)
                {
                    window.location.href = "Student/StudentDashboard.html";
                }
                else
                {
                    showError("PasswordError", "The password does not match this temporary student account.");
                    showResult(false);
                    focusFirstError();
                }
            }).catch(function ()
            {
                if (attempt === loginAttempt)
                {
                    showResult(false, "The browser could not run the demo password check. Use a current browser with a static preview, or use a sample account.");
                }
            });
            return false;
        }
        showError("PasswordError", "These details do not match an account in this demo session. For a registered account, choose Student and use the same tab and site address. You can also use a sample account below.");
    }
    showResult(false);
    focusFirstError();
    return false; // This demonstration never submits credentials to a server.
}

function resetLoginForm()
{
    cancelLoginAttempt();
    clearAllErrors();
    document.getElementById("Password").type = "password";
}
