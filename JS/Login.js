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
}

function fillDemoAccount()
{
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
        showError("PasswordError", "These details do not match the selected role's demo account. Use the account shown on this page.");
    }
    showResult(false);
    focusFirstError();
    return false; // This demonstration never submits credentials to a server.
}

function resetLoginForm()
{
    clearAllErrors();
    document.getElementById("Password").type = "password";
}
