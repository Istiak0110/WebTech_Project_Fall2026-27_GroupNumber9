function loadLoginPage()
{
    // The forms remain disabled if JavaScript cannot run.
    let groups = document.querySelectorAll("fieldset");
    for (let i = 0; i < groups.length; i++)
    {
        groups[i].disabled = false;
    }
    let role = window.location.search.replace("?role=", "");
    for (let i = 0; i < roles.length; i++)
    {
        if (role === roles[i])
        {
            document.getElementById("LoginRole").value = role;
        }
    }
    updateRoleTheme();
    let hash = window.location.hash;
    if (document.getElementById("LoginRole").value === "admin" && hash.indexOf("#register") === 0)
    {
        showRegistration("admin");
    }
    else if (hash === "#register-advisor")
    {
        showRegistration("advisor");
    }
    else if (hash === "#register-coordinator")
    {
        showRegistration("coordinator");
    }
    else if (hash === "#register")
    {
        showRegistration();
    }
}

function updateRoleTheme()
{
    let role = document.getElementById("LoginRole").value;
    document.body.className = "";
    for (let i = 0; i < roles.length; i++)
    {
        if (role === roles[i])
        {
            document.body.className = role;
        }
    }
    updateRegistrationLink(role);
}

function updateRegistrationLink(role)
{
    let prompt = document.getElementById("RegistrationPrompt");
    let link = document.getElementById("RegistrationLink");
    let navLink = document.getElementById("RegistrationNavLink");
    let name = "";
    let title = "";
    let target = "";
    prompt.hidden = true;
    navLink.hidden = true;
    document.getElementById("AdminRegistrationMessage").hidden = true;
    document.getElementById("SelectRoleMessage").hidden = true;
    if (role === "student")
    {
        name = "student";
        title = "Student Registration";
        target = "#register";
    }
    else if (role === "advisor")
    {
        name = "faculty advisor";
        title = "Faculty Advisor Registration";
        target = "#register-advisor";
    }
    else if (role === "coordinator")
    {
        name = "academic coordinator";
        title = "Academic Coordinator Registration";
        target = "#register-coordinator";
    }
    else if (role === "admin")
    {
        document.getElementById("AdminRegistrationMessage").hidden = false;
        return;
    }
    else
    {
        document.getElementById("SelectRoleMessage").hidden = false;
        return;
    }
    document.getElementById("RegistrationPromptText").textContent = "New " + name + "?";
    link.setAttribute("href", target);
    navLink.setAttribute("href", target);
    navLink.textContent = title;
    prompt.hidden = false;
    navLink.hidden = false;
}

function hideRegistrationForms()
{
    document.getElementById("register").hidden = true;
    document.getElementById("register-advisor").hidden = true;
    document.getElementById("register-coordinator").hidden = true;
}

function showRegistration(role)
{
    if (role === undefined || role === "")
    {
        role = document.getElementById("LoginRole").value;
        if (role === "")
        {
            role = "student"; // Supports the existing Student Registration link.
        }
    }
    if (role !== "student" && role !== "advisor" && role !== "coordinator")
    {
        if (role === "admin")
        {
            document.getElementById("LoginRole").value = "admin";
        }
        showLogin();
        return false;
    }
    hideRegistrationForms();
    document.getElementById("LoginRole").value = role;
    updateRoleTheme();
    document.getElementById("login").hidden = true;
    if (role === "student")
    {
        document.getElementById("register").hidden = false;
        document.getElementById("StudentName").focus();
    }
    else if (role === "advisor")
    {
        document.getElementById("register-advisor").hidden = false;
        document.getElementById("AdvisorName").focus();
    }
    else if (role === "coordinator")
    {
        document.getElementById("register-coordinator").hidden = false;
        document.getElementById("CoordinatorName").focus();
    }
    return false;
}

function showLogin(registeredRole)
{
    hideRegistrationForms();
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
    updateRegistrationLink("");
}
