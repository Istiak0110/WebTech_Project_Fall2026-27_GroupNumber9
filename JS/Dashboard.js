// All dashboard sections stay in the page, so moving between them keeps form values.
function showDashboardSection(sectionId)
{
    let sections = document.querySelectorAll("[data-dashboard-section]");
    let selected = null;
    for (let i = 0; i < sections.length; i++)
    {
        if (sections[i].id === sectionId) { selected = sections[i]; }
    }
    if (!selected) { return false; }
    let changed = selected.hidden;
    for (let i = 0; i < sections.length; i++)
    {
        sections[i].hidden = sections[i] !== selected;
    }
    document.getElementById("DashboardTitle").textContent = selected.getAttribute("data-title");
    document.getElementById("DashboardSubtitle").textContent = selected.getAttribute("data-description");
    let links = document.querySelectorAll("[data-section]");
    for (let i = 0; i < links.length; i++)
    {
        if (links[i].getAttribute("data-section") === sectionId)
        {
            links[i].className = "active";
            links[i].setAttribute("aria-current", "page");
        }
        else
        {
            links[i].className = "";
            links[i].removeAttribute("aria-current");
        }
    }
    document.getElementById("DashboardSidebar").className = "sidebar";
    document.getElementById("SidebarToggle").setAttribute("aria-expanded", "false");
    let profile = document.querySelector(".profile-menu");
    if (profile) { profile.open = false; }
    if (window.location.hash !== "#" + sectionId) { window.location.hash = sectionId; }
    if (changed) { document.getElementById("DashboardTitle").focus(); }
    window.scrollTo(0, 0);
    return false;
}

function toggleDashboardSidebar()
{
    let button = document.getElementById("SidebarToggle");
    let open = button.getAttribute("aria-expanded") !== "true";
    document.getElementById("DashboardSidebar").className = open ? "sidebar is-open" : "sidebar";
    button.setAttribute("aria-expanded", open ? "true" : "false");
}

function initializeDashboard(defaultSection)
{
    let close = document.createElement("button");
    close.type = "button";
    close.className = "sidebar-close";
    close.textContent = "Close menu ×";
    close.onclick = toggleDashboardSidebar;
    document.getElementById("DashboardSidebar").appendChild(close);

    let links = document.querySelectorAll(".sidebar-nav a");
    for (let i = 0; i < links.length; i++)
    {
        // This also closes the mobile menu when its current link is selected again.
        links[i].onclick = function () { return showDashboardSection(this.getAttribute("data-section")); };
    }
    window.onhashchange = function ()
    {
        let id = window.location.hash.substring(1);
        // The skip link targets the heading rather than a dashboard section.
        if (id !== "DashboardTitle")
        {
            if (!document.getElementById(id) || !document.getElementById(id).hasAttribute("data-dashboard-section"))
            {
                id = defaultSection;
            }
            showDashboardSection(id);
        }
    };
    let initial = window.location.hash.substring(1);
    let target = document.getElementById(initial);
    if (!target || !target.hasAttribute("data-dashboard-section")) { initial = defaultSection; }
    showDashboardSection(initial);
}
