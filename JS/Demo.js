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
    // Older draft profiles have no verifier. Keep them readable for a clear reset message.
    if (profile.passwordHash !== undefined &&
        (typeof profile.passwordHash !== "string" || !/^[a-f0-9]{64}$/.test(profile.passwordHash)))
    {
        return false;
    }
    return demoPrograms.indexOf(profile.program) !== -1 && demoSemesters.indexOf(profile.semester) !== -1;
}

// Explicit fields keep raw passwords and unrelated values out of storage.
function copyDemoProfile(profile)
{
    let copy = {
        name: profile.name,
        id: profile.id,
        email: profile.email.toLowerCase(),
        phone: profile.phone,
        program: profile.program,
        semester: profile.semester
    };
    if (profile.passwordHash !== undefined)
    {
        copy.passwordHash = profile.passwordHash;
    }
    return copy;
}

// Browser-provided hashing keeps the entered password out of saved profile data.
// This is a classroom login simulation, not a secure authentication system.
function makeDemoPasswordHash(password)
{
    if (!window.crypto || !window.crypto.subtle || typeof TextEncoder === "undefined")
    {
        return Promise.reject(new Error("Demo password checks need a supported browser and static preview."));
    }
    let encoded = new TextEncoder().encode(password);
    return window.crypto.subtle.digest("SHA-256", encoded).then(function (buffer)
    {
        let bytes = new Uint8Array(buffer);
        let hash = "";
        for (let i = 0; i < bytes.length; i++)
        {
            let part = bytes[i].toString(16);
            if (part.length === 1)
            {
                part = "0" + part;
            }
            hash = hash + part;
        }
        return hash;
    });
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

// A registered login needs a successful cross-page save. Failed writes add no profile.
function saveDemoStudent(profile)
{
    loadDemoProfiles();
    if (demoStorageReady)
    {
        let updated = temporaryStudents.concat([copyDemoProfile(profile)]);
        try
        {
            sessionStorage.setItem(demoProfileKey, JSON.stringify(updated));
            temporaryStudents = updated;
            return true;
        }
        catch (error)
        {
            demoStorageReady = false;
        }
    }
    return false;
}

function getRegisteredDemoStudent(email)
{
    loadDemoProfiles();
    for (let i = 0; i < temporaryStudents.length; i++)
    {
        if (temporaryStudents[i].email === email)
        {
            return temporaryStudents[i];
        }
    }
    return null;
}

function initializeDemoStatus()
{
    loadDemoProfiles();
    let status = document.getElementById("DemoStatus");
    if (status)
    {
        status.textContent = "Registered student demo logins last for this tab at this site address. Reset demo profiles removes them. Nothing is permanently saved.";
        if (window.location.protocol === "file:")
        {
            status.textContent = "Sample logins work here. To register your own demo login, open this folder with a static preview such as VS Code Live Server, then stay in the same tab. Direct HTML files do not reliably share temporary accounts.";
        }
        if (!demoStorageReady)
        {
            status.textContent = "Temporary browser storage is unavailable or saved demo data could not be read. New demo logins cannot be created. Reset demo profiles on the home page to clear old data, or use a static preview with storage enabled. Sample logins still work.";
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
