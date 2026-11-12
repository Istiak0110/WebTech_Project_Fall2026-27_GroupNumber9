function goToLogin(role)
{
    for (let i = 0; i < demoRoles.length; i++)
    {
        if (role === demoRoles[i])
        {
            window.location.href = "Login.html?role=" + role;
            return;
        }
    }
    window.location.href = "Login.html";
}

function loadHomePage()
{
    initializeDemoStatus();
}
