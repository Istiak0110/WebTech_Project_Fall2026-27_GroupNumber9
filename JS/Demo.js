// sessionStorage is temporary, belongs to this tab and may be blocked by a browser.
let demoProfileKey = "studybuddy.demo.profiles";
let temporaryStudents = [];
let demoStorageLoaded = false;
let demoStorageReady = false;

function isDemoProfile(profile)
{
    if (!profile || typeof profile !== "object")
    {
        return false;
    }
    if (typeof profile.name !== "string" || typeof profile.id !== "string" ||
        typeof profile.email !== "string" || typeof profile.phone !== "string" ||
        typeof profile.program !== "string" || typeof profile.semester !== "string")
    {
        return false;
    }
    if (profile.name.length < 3 || profile.name.length > 60 ||
        !/^[0-9]{2}-[0-9]{5}-[1-3]$/.test(profile.id) ||
        profile.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) ||
        (profile.phone !== "" && !/^01[3-9][0-9]{8}$/.test(profile.phone)))
    {
        return false;
    }
    return demoPrograms.indexOf(profile.program) !== -1 && demoSemesters.indexOf(profile.semester) !== -1;
}

// Explicit fields prevent passwords or unrelated values from entering storage.
function copyDemoProfile(profile)
{
    return {
        name: profile.name,
        id: profile.id,
        email: profile.email.toLowerCase(),
        phone: profile.phone,
        program: profile.program,
        semester: profile.semester
    };
}

function loadDemoProfiles()
{
    if (demoStorageLoaded)
    {
        return;
    }
    demoStorageLoaded = true;
    try
    {
        let saved = sessionStorage.getItem(demoProfileKey);
        let profiles = [];
        if (saved !== null)
        {
            profiles = JSON.parse(saved);
            if (!Array.isArray(profiles))
            {
                throw new Error("Invalid demo profile list");
            }
        }
        // Read into a separate list so malformed data cannot leave a partial result.
        let checkedProfiles = [];
        for (let i = 0; i < profiles.length; i++)
        {
            if (!isDemoProfile(profiles[i]))
            {
                throw new Error("Invalid demo profile");
            }
            let known = demoStudents.concat(checkedProfiles);
            for (let j = 0; j < known.length; j++)
            {
                if (known[j].id === profiles[i].id || known[j].email.toLowerCase() === profiles[i].email.toLowerCase())
                {
                    throw new Error("Duplicate demo profile");
                }
            }
            checkedProfiles.push(copyDemoProfile(profiles[i]));
        }
        temporaryStudents = checkedProfiles;
        demoStorageReady = true;
    }
    catch (error)
    {
        temporaryStudents = [];
        demoStorageReady = false;
    }
}

function getDemoStudents()
{
    loadDemoProfiles();
    return demoStudents.concat(temporaryStudents);
}

// true means this tab's storage accepted the profile; false means page memory only.
function saveDemoStudent(profile)
{
    loadDemoProfiles();
    temporaryStudents.push(copyDemoProfile(profile));
    if (demoStorageReady)
    {
        try
        {
            sessionStorage.setItem(demoProfileKey, JSON.stringify(temporaryStudents));
            return true;
        }
        catch (error)
        {
            demoStorageReady = false;
        }
    }
    return false;
}

function initializeDemoStatus()
{
    loadDemoProfiles();
    let status = document.getElementById("DemoStatus");
    if (status)
    {
        status.textContent = "Frontend demo. Temporary profiles can stay in this tab; Reset Demo restores the sample records.";
        if (!demoStorageReady)
        {
            status.textContent = "Browser storage is unavailable or saved demo data could not be read. New profiles stay on this page only. Reset Demo can clear StudyBuddy's demo data.";
        }
    }
}

function resetDemoData()
{
    temporaryStudents = [];
    demoStorageLoaded = true;
    let message = "StudyBuddy demo profiles reset. The original sample records are ready.";
    try
    {
        sessionStorage.removeItem(demoProfileKey);
        demoStorageReady = true;
    }
    catch (error)
    {
        demoStorageReady = false;
        message = "Profiles on this page were reset. Browser storage could not be cleared; saved profiles may return after navigation.";
    }
    let status = document.getElementById("DemoStatus");
    if (status)
    {
        status.textContent = message;
    }
}
