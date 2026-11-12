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
    if (window.location.hash === "#register")
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
}

function showRegistration()
{
    document.getElementById("login").hidden = true;
    document.getElementById("register").hidden = false;
    document.body.className = "student";
    document.getElementById("StudentName").focus();
}

function showLogin()
{
    document.getElementById("register").hidden = true;
    document.getElementById("login").hidden = false;
    resetLoginForm();
    if (registeredStudents.length > 0)
    {
        let student = registeredStudents[registeredStudents.length - 1];
        document.getElementById("LoginRole").value = "student";
        document.getElementById("LoginEmail").value = student.email;
    }
    document.getElementById("LoginPassword").value = "";
    document.getElementById("ShowLoginPassword").checked = false;
    updateRoleTheme();
    document.getElementById("LoginRole").focus();
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
        for (let i = 0; i < registeredStudents.length; i++)
        {
            let student = registeredStudents[i];
            if (email === student.email && password === student.password)
            {
                if (role === "student")
                {
                    window.location.href = "Student/StudentDashboard.html";
                    return false;
                }
                showError("LoginRole", "Select Student for a registered student account.");
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
