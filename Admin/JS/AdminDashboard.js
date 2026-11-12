function loadAdminDashboard()
{
    let groups = document.querySelectorAll("fieldset");
    for (let i = 0; i < groups.length; i++)
    {
        groups[i].disabled = false;
    }
    loadPrerequisiteOptions();
    renderAdminCatalog();
    renderAdminOverview();
    initializeDashboard("overview");
}

function loadPrerequisiteOptions()
{
    let select = document.getElementById("CoursePrerequisite");
    let previous = select.value;
    select.textContent = "";
    let none = document.createElement("option");
    none.value = "";
    none.textContent = "None";
    select.appendChild(none);
    for (let i = 0; i < academicCourses.length; i++)
    {
        let option = document.createElement("option");
        option.value = academicCourses[i].code;
        option.textContent = academicCourses[i].code + " - " + academicCourses[i].title;
        select.appendChild(option);
    }
    select.value = previous;
}

function addAdminCell(row, text)
{
    let cell = document.createElement("td");
    cell.textContent = text;
    row.appendChild(cell);
}

function renderAdminCatalog()
{
    let body = document.getElementById("AdminCourseRows");
    body.textContent = "";
    for (let i = 0; i < academicCourses.length; i++)
    {
        let course = academicCourses[i];
        let row = document.createElement("tr");
        addAdminCell(row, course.code);
        addAdminCell(row, course.title);
        addAdminCell(row, course.credits);
        addAdminCell(row, course.department);
        let eligibility = getCourseEligibility(course.code, []);
        let rule = eligibility.prerequisites.join(", ") || "None";
        if (eligibility.minimumCredits > 0)
        {
            rule += " / " + eligibility.minimumCredits + " earned credits";
        }
        addAdminCell(row, rule);
        body.appendChild(row);
    }
}

function validateCourseCode()
{
    let code = document.getElementById("CourseCode").value.trim().toUpperCase();
    if (!/^[A-Z]{2,4}[0-9]{3}$/.test(code))
    {
        showError("CourseCode", "Use 2 to 4 letters followed by 3 digits, such as CSE408.");
        return false;
    }
    for (let i = 0; i < academicCourses.length; i++)
    {
        if (academicCourses[i].code.toUpperCase() === code)
        {
            showError("CourseCode", "This course code is already in the catalog.");
            return false;
        }
    }
    clearError("CourseCode");
    return true;
}

function validateCoursePrerequisite()
{
    let prerequisite = document.getElementById("CoursePrerequisite").value;
    let code = document.getElementById("CourseCode").value.trim().toUpperCase();
    if (prerequisite !== "" && prerequisite === code)
    {
        showError("CoursePrerequisite", "A course cannot be its own prerequisite.");
        return false;
    }
    if (prerequisite !== "" && getAcademicCourse(prerequisite) === null)
    {
        showError("CoursePrerequisite", "Select an existing course or None.");
        return false;
    }
    clearError("CoursePrerequisite");
    return true;
}

function validateAddCourseForm()
{
    let validCode = validateCourseCode();
    let validTitle = validateTextLength("CourseTitle", "the course title", 3, 80);
    let validCredits = validateNumber("CourseCredits", "credit hours", 1, 4, true);
    let validDepartment = validateSelect("CourseDepartment", academicDepartments, "a department");
    let validPrerequisite = validateCoursePrerequisite();
    let isValid = validCode && validTitle && validCredits && validDepartment && validPrerequisite;
    if (isValid)
    {
        let course = {
            code: document.getElementById("CourseCode").value.trim().toUpperCase(),
            title: document.getElementById("CourseTitle").value.trim(),
            credits: Number(document.getElementById("CourseCredits").value),
            department: document.getElementById("CourseDepartment").value,
            prerequisite: document.getElementById("CoursePrerequisite").value
        };
        academicCourses.push(course);
        renderAdminCatalog();
        loadPrerequisiteOptions();
        renderAdminOverview();
        showResult("CourseResult", true, course.code + " was added to this page's temporary catalog. It is not saved or shared with other pages.");
    }
    else
    {
        showResult("CourseResult", false, "Please correct the marked course fields.");
        focusFirstError("AddCourseForm");
    }
    return false;
}

function resetAddCourseForm()
{
    clearFormErrors("AddCourseForm", "CourseResult");
}

function clearStudentSearchResults()
{
    clearResult("SearchResult");
    document.getElementById("StudentSearchRows").textContent = "";
    document.getElementById("StudentSearchTable").hidden = true;
}

function searchStudents()
{
    clearStudentSearchResults();
    if (!validateTextLength("StudentQuery", "a search term", 2, 80))
    {
        showResult("SearchResult", false, "Please enter a search term with 2 to 80 characters.");
        focusFirstError("StudentSearchForm");
        return false;
    }
    let query = document.getElementById("StudentQuery").value.trim().toLowerCase();
    let matches = 0;
    let body = document.getElementById("StudentSearchRows");
    for (let i = 0; i < academicStudents.length; i++)
    {
        let student = academicStudents[i];
        if (student.id.toLowerCase().indexOf(query) !== -1 ||
            student.name.toLowerCase().indexOf(query) !== -1 ||
            student.email.toLowerCase().indexOf(query) !== -1 ||
            student.department.toLowerCase().indexOf(query) !== -1)
        {
            let row = document.createElement("tr");
            addAdminCell(row, student.id);
            addAdminCell(row, student.name);
            addAdminCell(row, student.email);
            addAdminCell(row, student.department);
            addAdminCell(row, student.completed.join(", "));
            body.appendChild(row);
            matches++;
        }
    }
    if (matches === 0)
    {
        showResult("SearchResult", false, "No matching student was found. Try a different ID, name, email or department.");
    }
    else
    {
        document.getElementById("StudentSearchTable").hidden = false;
        showResult("SearchResult", true, matches + " matching sample student(s) found.");
    }
    return false;
}

function resetStudentSearch()
{
    clearFormErrors("StudentSearchForm", "SearchResult");
    clearStudentSearchResults();
}

// Summary cards and rule tables read the same data as the Student tools.
function renderAdminOverview()
{
    let ruleRows = document.getElementById("AdminPrerequisiteRows");
    ruleRows.textContent = "";
    let ruleCount = 0;
    for (let i = 0; i < academicCourses.length; i++)
    {
        let course = academicCourses[i];
        let eligibility = getCourseEligibility(course.code, []);
        ruleCount += eligibility.prerequisites.length;
        if (eligibility.prerequisites.length > 0 || eligibility.minimumCredits > 0)
        {
            let row = document.createElement("tr");
            addAdminCell(row, course.code + " - " + course.title);
            addAdminCell(row, eligibility.prerequisites.join(", ") || "None");
            addAdminCell(row, eligibility.minimumCredits);
            ruleRows.appendChild(row);
        }
    }
    let progress = getDemoProgress(academicStudents[0].id);
    let requirementRows = document.getElementById("AdminRequirementRows");
    requirementRows.textContent = "";
    for (let i = 0; i < progress.categories.length; i++)
    {
        let group = progress.categories[i];
        let row = document.createElement("tr");
        addAdminCell(row, group.name);
        addAdminCell(row, group.requiredCount);
        addAdminCell(row, group.requiredCredits);
        requirementRows.appendChild(row);
    }
    document.getElementById("AdminCourseCount").textContent = academicCourses.length;
    document.getElementById("AdminRuleCount").textContent = ruleCount;
    document.getElementById("AdminRequirementCount").textContent = progress.categories.length;
    document.getElementById("AdminStudentCount").textContent = academicStudents.length;
    document.getElementById("AdminDepartmentCount").textContent = academicDepartments.length;
    document.getElementById("AdminCurriculumCredits").textContent = progress.totalCredits;
    document.getElementById("AdminDegreeCredits").textContent = progress.totalCredits;
    document.getElementById("AdminPolicyCreditLimit").textContent = semesterCreditLimit;
    let grades = [];
    for (let i = 0; i < academicGrades.length; i++)
    {
        grades.push(academicGrades[i].letter + " = " + academicGrades[i].points.toFixed(2));
    }
    document.getElementById("AdminPolicyGrades").textContent = grades.join(", ");
}
