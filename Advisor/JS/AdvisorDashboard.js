// Notes exist only in this page's memory. No records are sent to a server.
let advisingNotes = [];
let advisingStatuses = ["Pending", "Approved", "Needs Revision"];

function loadAdvisorDashboard()
{
    let groups = document.querySelectorAll("fieldset");
    for (let i = 0; i < groups.length; i++)
    {
        groups[i].disabled = false;
    }
    let studentSelect = document.getElementById("AdvisingStudent");
    for (let i = 0; i < academicStudents.length; i++)
    {
        let option = document.createElement("option");
        option.value = academicStudents[i].id;
        option.textContent = academicStudents[i].id + " - " + academicStudents[i].name;
        studentSelect.appendChild(option);
    }
    let semesterSelect = document.getElementById("AdvisingSemester");
    for (let i = 0; i < academicSemesters.length; i++)
    {
        let option = document.createElement("option");
        option.value = academicSemesters[i];
        option.textContent = academicSemesters[i];
        semesterSelect.appendChild(option);
    }
    document.getElementById("AdvisingCreditLimit").textContent = "Demo course credit limit: " + semesterCreditLimit + ".";
    displayCoursePlans();
}

function loadAdvisingCourses()
{
    let container = document.getElementById("AdvisingCourses");
    container.textContent = "";
    document.getElementById("AdvisingCoursesError").textContent = "";
    clearResult("AdvisingResult");
    let semester = document.getElementById("AdvisingSemester").value;
    let courses = getSemesterCourses(semester);
    document.getElementById("AdvisingCourseHint").textContent = "Select at least one course. Total credits must stay within the demo limit.";
    if (courses.length === 0)
    {
        document.getElementById("AdvisingCourseHint").textContent = "Select a valid semester to see offered courses.";
    }
    for (let i = 0; i < courses.length; i++)
    {
        let label = document.createElement("label");
        label.className = "choice";
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "advisingCourse";
        checkbox.value = courses[i].code;
        checkbox.id = "AdvisingCourse" + courses[i].code;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + courses[i].code + " - " + courses[i].title + " (" + courses[i].credits + " credits)"));
        container.appendChild(label);
    }
}

function validateAdvisingCourses()
{
    let validSelection = validateCheckboxes("advisingCourse", "AdvisingCoursesError", "recommended course", 1);
    if (!validSelection)
    {
        return false;
    }
    let selected = getCheckedValues("advisingCourse");
    let available = getSemesterCourses(document.getElementById("AdvisingSemester").value);
    let credits = 0;
    for (let i = 0; i < selected.length; i++)
    {
        let found = false;
        for (let j = 0; j < available.length; j++)
        {
            if (selected[i] === available[j].code)
            {
                found = true;
                credits = credits + available[j].credits;
            }
        }
        if (!found || selected.indexOf(selected[i]) !== i)
        {
            document.getElementById("AdvisingCoursesError").textContent = "Select each course once from this semester's offered courses.";
            return false;
        }
    }
    if (credits > semesterCreditLimit)
    {
        document.getElementById("AdvisingCoursesError").textContent = "Selected courses total " + credits + " credits. The demo limit is " + semesterCreditLimit + ".";
        return false;
    }
    return true;
}

function validateAdvisingComments()
{
    let valid = validateTextLength("AdvisingComments", "advising comments", 10, 500);
    if (!valid)
    {
        return false;
    }
    let comments = document.getElementById("AdvisingComments").value.trim();
    if (document.getElementById("AdvisingStatus").value === "Needs Revision" && comments.length < 30)
    {
        showError("AdvisingComments", "Explain the required changes using at least 30 characters.");
        return false;
    }
    return true;
}

function validateAdvisingForm()
{
    clearResult("AdvisingResult");
    let studentIDs = [];
    for (let i = 0; i < academicStudents.length; i++)
    {
        studentIDs.push(academicStudents[i].id);
    }
    // Call each check first, matching the sample's all-errors-at-once approach.
    let validStudent = validateSelect("AdvisingStudent", studentIDs, "a student");
    let validSemester = validateSelect("AdvisingSemester", academicSemesters, "a semester");
    let validCourses = validateAdvisingCourses();
    let validComments = validateAdvisingComments();
    let validStatus = validateSelect("AdvisingStatus", advisingStatuses, "an advising status");
    let isValid = validStudent && validSemester && validCourses && validComments && validStatus;
    if (isValid)
    {
        let note = {
            studentId: document.getElementById("AdvisingStudent").value,
            semester: document.getElementById("AdvisingSemester").value,
            courses: getCheckedValues("advisingCourse"),
            comments: document.getElementById("AdvisingComments").value.trim(),
            status: document.getElementById("AdvisingStatus").value
        };
        advisingNotes.push(note);
        displayAdvisingNotes();
        showResult("AdvisingResult", true, "Advising note added to this page only. It will reset when you refresh or leave.");
    }
    else
    {
        showResult("AdvisingResult", false, "Please correct the marked advising fields.");
        focusFirstError("AdvisingForm");
    }
    return false;
}

function displayAdvisingNotes()
{
    let rows = document.getElementById("AdvisingNotesRows");
    rows.textContent = "";
    document.getElementById("AdvisingNotesEmpty").hidden = advisingNotes.length > 0;
    for (let i = 0; i < advisingNotes.length; i++)
    {
        let note = advisingNotes[i];
        let student = getAcademicStudent(note.studentId);
        let row = document.createElement("tr");
        let values = [student.name + " (" + student.id + ")", note.semester, note.courses.join(", "), note.comments, note.status];
        for (let j = 0; j < values.length; j++)
        {
            let cell = document.createElement("td");
            cell.textContent = values[j];
            row.appendChild(cell);
        }
        rows.appendChild(row);
    }
}

function resetAdvisingForm()
{
    clearFormErrors("AdvisingForm", "AdvisingResult");
    document.getElementById("AdvisingCourses").textContent = "";
    document.getElementById("AdvisingCoursesError").textContent = "";
    document.getElementById("AdvisingCourseHint").textContent = "Select a semester to see offered courses.";
}

function displayCoursePlans()
{
    let rows = document.getElementById("PlanReviewRows");
    rows.textContent = "";
    for (let i = 0; i < academicPlans.length; i++)
    {
        let plan = academicPlans[i];
        let student = getAcademicStudent(plan.studentId);
        let credits = 0;
        for (let j = 0; j < plan.courses.length; j++)
        {
            credits = credits + getAcademicCourse(plan.courses[j]).credits;
        }
        let row = document.createElement("tr");
        let values = [student.name + " (" + student.id + ")", plan.semester, plan.courses.join(", ") + " / " + credits + " credits", plan.status];
        for (let j = 0; j < values.length; j++)
        {
            let cell = document.createElement("td");
            cell.textContent = values[j];
            if (j === 3) { cell.id = "PlanStatus" + plan.id; }
            row.appendChild(cell);
        }
        let controls = document.createElement("td");
        let label = document.createElement("label");
        label.htmlFor = "ReviewStatus" + plan.id;
        label.textContent = "Status for " + plan.id;
        controls.appendChild(label);
        let select = document.createElement("select");
        select.id = "ReviewStatus" + plan.id;
        select.setAttribute("aria-describedby", "ReviewError" + plan.id);
        for (let j = 0; j < advisingStatuses.length; j++)
        {
            let option = document.createElement("option");
            option.value = advisingStatuses[j];
            option.textContent = advisingStatuses[j];
            option.selected = plan.status === advisingStatuses[j];
            select.appendChild(option);
        }
        controls.appendChild(select);
        let error = document.createElement("p");
        error.id = "ReviewError" + plan.id;
        error.className = "error";
        controls.appendChild(error);
        let button = document.createElement("button");
        button.type = "button";
        button.value = plan.id;
        button.textContent = "Update Status";
        button.onclick = function () { updatePlanStatus(this.value); };
        controls.appendChild(button);
        row.appendChild(controls);
        rows.appendChild(row);
    }
}

function updatePlanStatus(planId)
{
    let plan = null;
    for (let i = 0; i < academicPlans.length; i++)
    {
        if (academicPlans[i].id === planId) { plan = academicPlans[i]; }
    }
    if (!plan)
    {
        showResult("ReviewResult", false, "Choose an existing sample plan.");
        return false;
    }
    let select = document.getElementById("ReviewStatus" + planId);
    let status = select.value;
    let valid = false;
    for (let i = 0; i < advisingStatuses.length; i++)
    {
        if (status === advisingStatuses[i]) { valid = true; }
    }
    if (!valid)
    {
        document.getElementById("ReviewError" + planId).textContent = "Select Approved, Needs Revision or Pending.";
        select.setAttribute("aria-invalid", "true");
        showResult("ReviewResult", false, "Please choose a valid review decision.");
        select.focus();
        return false;
    }
    document.getElementById("ReviewError" + planId).textContent = "";
    select.removeAttribute("aria-invalid");
    plan.status = status;
    document.getElementById("PlanStatus" + planId).textContent = status;
    showResult("ReviewResult", true, planId + " is now " + status + " on this page only.");
    return false;
}
