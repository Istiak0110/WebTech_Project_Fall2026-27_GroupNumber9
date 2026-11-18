function loadLoginPage()
{
    // The forms remain disabled if JavaScript cannot run.
    let groups = document.querySelectorAll("fieldset");
    for (let i = 0; i < groups.length; i++)
    {
        groups[i].disabled = false;
    }
    let role = new URLSearchParams(window.location.search).get("role");
    if (roles.includes(role))
    {
        document.getElementById("LoginRole").value = role;
    }
    updateRoleTheme();
    if (window.location.hash === "#register")
    {
        showRegistration();
    }
}

function updateRoleTheme()
{
    let role = document.getElementById("LoginRole").value;
    document.body.className = roles.includes(role) ? role : "";
}

function showRegistration()
{
    document.getElementById("LoginRole").value = "student";
    updateRoleTheme();
    document.getElementById("login").hidden = true;
    document.getElementById("register").hidden = false;
    document.getElementById("StudentName").focus();
}

function showLogin(registeredRole)
{
    document.getElementById("register").hidden = true;
    document.getElementById("login").hidden = false;
    resetLoginForm();
    if (registeredRole)
    {
        // Find the latest account from the form whose Go to login button was used.
        for (let i = registeredAccounts.length - 1; i >= 0; i--)
        {
            let account = registeredAccounts[i];
            if (account.role === registeredRole)
            {
                document.getElementById("LoginRole").value = account.role;
                document.getElementById("LoginEmail").value = account.email;
                break;
            }
        }
    }
    document.getElementById("LoginPassword").value = "";
    document.getElementById("ShowLoginPassword").checked = false;
    updateRoleTheme();
    document.getElementById("LoginRole").focus();
}

function getDashboardPage(role)
{
    for (let i = 0; i < demoAccounts.length; i++)
    {
        if (demoAccounts[i].role === role)
        {
            return demoAccounts[i].page;
        }
    }
    return "Login.html";
}

function validateLoginForm()
{
    let validRole = validateSelect("LoginRole", roles, "a role");
    let validEmail = validateEmail("LoginEmail");
    let validPassword = validateRequired("LoginPassword", "your password");
    let isValid = validRole && validEmail && validPassword;
    if (isValid)
    {
        let role = document.getElementById("LoginRole").value;
        let email = document.getElementById("LoginEmail").value.trim().toLowerCase();
        let password = document.getElementById("LoginPassword").value;
        for (let i = 0; i < demoAccounts.length; i++)
        {
            if (role === demoAccounts[i].role && email === demoAccounts[i].email &&
                password === demoAccounts[i].password)
            {
                window.location.href = demoAccounts[i].page;
                return false;
            }
        }
        for (let i = 0; i < registeredAccounts.length; i++)
        {
            let account = registeredAccounts[i];
            if (email === account.email && password === account.password)
            {
                if (role === account.role)
                {
                    window.location.href = getDashboardPage(role);
                    return false;
                }
                showError("LoginRole", "Select the role used for this registered demo account.");
                showResult("LoginResult", false, "Please select the correct role.");
                focusFirstError("LoginForm");
                return false;
            }
        }
        showError("LoginPassword", "The email, password and role do not match an available demo account.");
    }
    showResult("LoginResult", false, "Please check the fields above.");
    focusFirstError("LoginForm");
    return false;
}

function resetLoginForm()
{
    clearFormErrors("LoginForm", "LoginResult");
    document.getElementById("LoginPassword").type = "password";
    // Native form reset returns the role select to its empty first option.
    document.body.className = "";
}
