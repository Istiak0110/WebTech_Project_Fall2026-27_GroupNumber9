let gpaRowIds = [];
let nextGPARow = 1;

function loadStudentDashboard()
{
    let groups = document.querySelectorAll("fieldset");
    for (let i = 0; i < groups.length; i++) { groups[i].disabled = false; }
    let scale = [];
    for (let i = 0; i < academicGrades.length; i++)
    {
        scale.push(academicGrades[i].letter + " = " + academicGrades[i].points.toFixed(2));
    }
    document.getElementById("GradeScale").textContent = scale.join(", ");
    let semester = document.getElementById("PlannerSemester");
    for (let i = 0; i < academicSemesters.length; i++)
    {
        let option = document.createElement("option");
        option.value = academicSemesters[i];
        option.textContent = academicSemesters[i];
        semester.appendChild(option);
    }
    document.getElementById("PlannerLimit").textContent = semesterCreditLimit;
    addCourseRow();
    loadPlannerCourses();
    loadCompletedChoices();
    showSampleProgress();
}

function showSampleProgress()
{
    let student = academicStudents[0];
    document.getElementById("ProgressStudent").textContent = student.name + " (" + student.id + ")";
    let body = document.getElementById("ProgressRows");
    body.textContent = "";
    let total = 0;
    for (let i = 0; i < student.completed.length; i++)
    {
        let course = getAcademicCourse(student.completed[i]);
        if (course)
        {
            let row = document.createElement("tr");
            let values = [course.code, course.title, course.credits, "Completed"];
            for (let j = 0; j < values.length; j++)
            {
                let cell = document.createElement("td");
                cell.textContent = values[j];
                row.appendChild(cell);
            }
            body.appendChild(row);
            total = total + course.credits;
        }
    }
    document.getElementById("ProgressCredits").textContent = total;
}

// The two text/number fields use the same simple label/input/error structure.
function addGPAInput(row, id, labelText, type)
{
    let group = document.createElement("div");
    let label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = labelText;
    let input = document.createElement("input");
    input.id = id;
    input.type = type;
    input.required = true;
    input.setAttribute("aria-describedby", id + "Error");
    let error = document.createElement("p");
    error.id = id + "Error";
    error.className = "error";
    group.appendChild(label);
    group.appendChild(input);
    group.appendChild(error);
    row.appendChild(group);
    return input;
}

function addCourseRow()
{
    let number = nextGPARow;
    nextGPARow++;
    gpaRowIds.push(number);
    let row = document.createElement("div");
    row.id = "CourseRow" + number;
    row.className = "course-row";
    addGPAInput(row, "CourseName" + number, "Course name", "text");
    let credits = addGPAInput(row, "CourseCredits" + number, "Credit hours", "number");
    credits.min = "1";
    credits.max = "4";
    credits.step = "1";
    let group = document.createElement("div");
    let label = document.createElement("label");
    label.setAttribute("for", "CourseGrade" + number);
    label.textContent = "Letter grade";
    let select = document.createElement("select");
    select.id = "CourseGrade" + number;
    select.required = true;
    select.setAttribute("aria-describedby", select.id + "Error");
    let first = document.createElement("option");
    first.value = "";
    first.textContent = "Select grade";
    select.appendChild(first);
    for (let i = 0; i < academicGrades.length; i++)
    {
        let option = document.createElement("option");
        option.value = academicGrades[i].letter;
        option.textContent = academicGrades[i].letter;
        select.appendChild(option);
    }
    let error = document.createElement("p");
    error.id = select.id + "Error";
    error.className = "error";
    group.appendChild(label);
    group.appendChild(select);
    group.appendChild(error);
    row.appendChild(group);
    let button = document.createElement("button");
    button.type = "button";
    button.className = "secondary";
    button.textContent = "Remove";
    button.setAttribute("aria-label", "Remove course row " + number);
    button.onclick = function () { removeCourseRow(number); };
    row.appendChild(button);
    document.getElementById("CourseRows").appendChild(row);
    clearGPAResult();
}

function removeCourseRow(number)
{
    let row = document.getElementById("CourseRow" + number);
    if (row)
    {
        row.parentNode.removeChild(row);
        let index = gpaRowIds.indexOf(number);
        if (index !== -1) { gpaRowIds.splice(index, 1); }
    }
    clearGPAResult();
}

function clearGPAResult()
{
    clearResult("CGPAResult");
    document.getElementById("GPATotalCredits").textContent = "—";
    document.getElementById("GPAValue").textContent = "—";
}

function calculateStudentGPA()
{
    clearGPAResult();
    let gradeLetters = [];
    for (let i = 0; i < academicGrades.length; i++) { gradeLetters.push(academicGrades[i].letter); }
    let isValid = gpaRowIds.length > 0;
    let names = [];
    let totalCredits = 0;
    let totalPoints = 0;
    for (let i = 0; i < gpaRowIds.length; i++)
    {
        let number = gpaRowIds[i];
        let nameId = "CourseName" + number;
        let creditId = "CourseCredits" + number;
        let gradeId = "CourseGrade" + number;
        let validName = validateTextLength(nameId, "a course name", 2, 80);
        let validCredits = validateNumber(creditId, "credit hours", 1, 4, true);
        let validGrade = validateSelect(gradeId, gradeLetters, "a letter grade");
        let name = document.getElementById(nameId).value.trim().toLowerCase().replace(/\s+/g, " ");
        if (validName && names.indexOf(name) !== -1)
        {
            showError(nameId, "This course name is already listed. Enter each course once.");
            validName = false;
        }
        names.push(name);
        if (validName && validCredits && validGrade)
        {
            let credits = Number(document.getElementById(creditId).value);
            let grade = document.getElementById(gradeId).value;
            for (let j = 0; j < academicGrades.length; j++)
            {
                if (academicGrades[j].letter === grade)
                {
                    totalCredits = totalCredits + credits;
                    totalPoints = totalPoints + credits * academicGrades[j].points;
                }
            }
        }
        else { isValid = false; }
    }
    if (isValid && totalCredits > 0)
    {
        document.getElementById("GPATotalCredits").textContent = totalCredits;
        document.getElementById("GPAValue").textContent = (totalPoints / totalCredits).toFixed(2);
        showResult("CGPAResult", true, "GPA calculated for the courses entered using the sample scale.");
    }
    else
    {
        showResult("CGPAResult", false, "Add at least one complete course and correct the marked fields.");
        focusFirstError("CGPAForm");
    }
    return false;
}

function resetCGPAForm()
{
    clearFormErrors("CGPAForm", "CGPAResult");
    document.getElementById("CourseRows").textContent = "";
    gpaRowIds = [];
    addCourseRow();
}

function loadPlannerCourses()
{
    let semester = document.getElementById("PlannerSemester").value;
    let choices = document.getElementById("PlannerCourses");
    choices.textContent = "";
    let courses = getSemesterCourses(semester);
    for (let i = 0; i < courses.length; i++)
    {
        let label = document.createElement("label");
        label.className = "choice";
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "plannerCourse";
        checkbox.id = "PlannerCourse" + courses[i].code;
        checkbox.value = courses[i].code;
        checkbox.onchange = updatePlannerCredits;
        checkbox.setAttribute("aria-describedby", "PlannerCoursesError");
        let text = document.createElement("span");
        text.textContent = courses[i].code + " — " + courses[i].title + " (" + courses[i].credits + " credits)";
        label.appendChild(checkbox);
        label.appendChild(text);
        choices.appendChild(label);
    }
    if (courses.length === 0)
    {
        choices.textContent = "Select a semester to see its available sample courses.";
    }
    document.getElementById("PlannerCoursesError").textContent = "";
    updatePlannerCredits();
}

function updatePlannerCredits()
{
    let selected = getCheckedValues("plannerCourse");
    let total = 0;
    for (let i = 0; i < selected.length; i++)
    {
        let course = getAcademicCourse(selected[i]);
        if (course) { total = total + course.credits; }
    }
    document.getElementById("PlannerCreditTotal").textContent = total;
    document.getElementById("PlannerSummary").textContent = "";
    document.getElementById("PlannerCoursesError").textContent = "";
    clearResult("PlannerResult");
}

function validateSemesterPlan()
{
    document.getElementById("PlannerSummary").textContent = "";
    let validSemester = validateSelect("PlannerSemester", academicSemesters, "a semester");
    let validSelection = validateCheckboxes("plannerCourse", "PlannerCoursesError", "course", 1);
    let selected = getCheckedValues("plannerCourse");
    let available = getSemesterCourses(document.getElementById("PlannerSemester").value);
    let allowedCodes = [];
    let seen = [];
    let total = 0;
    for (let i = 0; i < available.length; i++) { allowedCodes.push(available[i].code); }
    for (let i = 0; i < selected.length; i++)
    {
        if (allowedCodes.indexOf(selected[i]) === -1 || seen.indexOf(selected[i]) !== -1)
        {
            validSelection = false;
            document.getElementById("PlannerCoursesError").textContent = "Choose each course once from the selected semester's list.";
        }
        else
        {
            total = total + getAcademicCourse(selected[i]).credits;
            seen.push(selected[i]);
        }
    }
    if (total > semesterCreditLimit)
    {
        validSelection = false;
        document.getElementById("PlannerCoursesError").textContent = "The plan has " + total + " credits. The demo limit is " + semesterCreditLimit + ".";
    }
    document.getElementById("PlannerCreditTotal").textContent = total;
    if (validSemester && validSelection)
    {
        let summary = document.getElementById("PlannerSummary");
        let heading = document.createElement("p");
        heading.textContent = document.getElementById("PlannerSemester").value + " — " + total + " total credits";
        summary.appendChild(heading);
        let list = document.createElement("ul");
        for (let i = 0; i < selected.length; i++)
        {
            let course = getAcademicCourse(selected[i]);
            let item = document.createElement("li");
            item.textContent = course.code + " — " + course.title + " (" + course.credits + " credits)";
            list.appendChild(item);
        }
        summary.appendChild(list);
        showResult("PlannerResult", true, "Semester plan prepared for this page only.");
    }
    else
    {
        showResult("PlannerResult", false, "Select a semester and courses within the credit limit.");
        focusFirstError("PlannerForm");
    }
    return false;
}

function resetPlannerForm()
{
    clearFormErrors("PlannerForm", "PlannerResult");
    document.getElementById("PlannerSemester").value = "";
    loadPlannerCourses();
}

function loadCompletedChoices()
{
    let choices = document.getElementById("CompletedCourses");
    choices.textContent = "";
    for (let i = 0; i < academicCourses.length; i++)
    {
        let label = document.createElement("label");
        label.className = "choice";
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "completedCourse";
        checkbox.id = "CompletedCourse" + academicCourses[i].code;
        checkbox.value = academicCourses[i].code;
        checkbox.setAttribute("aria-describedby", "CompletedCoursesError");
        let text = document.createElement("span");
        text.textContent = academicCourses[i].code + " — " + academicCourses[i].title;
        label.appendChild(checkbox);
        label.appendChild(text);
        choices.appendChild(label);
    }
}

function clearRecommendations()
{
    document.getElementById("RecommendationRows").textContent = "";
    document.getElementById("CompletedCoursesError").textContent = "";
    clearResult("RecommendationResult");
}

function recommendCourses()
{
    clearRecommendations();
    let completed = getCheckedValues("completedCourse");
    let valid = true;
    let seen = [];
    for (let i = 0; i < completed.length; i++)
    {
        if (!getAcademicCourse(completed[i]) || seen.indexOf(completed[i]) !== -1) { valid = false; }
        seen.push(completed[i]);
    }
    if (!valid)
    {
        document.getElementById("CompletedCoursesError").textContent = "Select each completed course once from the sample course list.";
        showResult("RecommendationResult", false, "Please check the completed course selection.");
        return false;
    }
    let eligibleCount = 0;
    let body = document.getElementById("RecommendationRows");
    for (let i = 0; i < academicCourses.length; i++)
    {
        let course = academicCourses[i];
        let status = "Eligible";
        let reason = "No prerequisite is required.";
        if (completed.indexOf(course.code) !== -1)
        {
            status = "Already completed";
            reason = "You selected this course as completed.";
        }
        else if (course.prerequisite !== "" && completed.indexOf(course.prerequisite) === -1)
        {
            status = "Not eligible";
            reason = "Complete " + course.prerequisite + " first.";
        }
        else if (course.prerequisite !== "")
        {
            reason = "You completed its prerequisite, " + course.prerequisite + ".";
        }
        if (status === "Eligible") { eligibleCount++; }
        let row = document.createElement("tr");
        let values = [course.code + " — " + course.title, status, reason];
        for (let j = 0; j < values.length; j++)
        {
            let cell = document.createElement("td");
            cell.textContent = values[j];
            row.appendChild(cell);
        }
        body.appendChild(row);
    }
    showResult("RecommendationResult", true, eligibleCount + " courses are eligible under the sample prerequisite rules.");
    return false;
}

function resetRecommendations()
{
    clearFormErrors("RecommendationForm", "RecommendationResult");
    let checkboxes = document.querySelectorAll('input[name="completedCourse"]');
    for (let i = 0; i < checkboxes.length; i++) { checkboxes[i].checked = false; }
    clearRecommendations();
}
