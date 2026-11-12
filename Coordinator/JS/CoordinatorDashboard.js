function addCoordinatorOption(selectId, value, text)
{
    let option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    document.getElementById(selectId).appendChild(option);
}

function coordinatorCourseCodes()
{
    let codes = [];
    for (let i = 0; i < academicCourses.length; i++)
    {
        codes.push(academicCourses[i].code);
    }
    return codes;
}

function loadCoordinatorDashboard()
{
    let groups = document.querySelectorAll("fieldset");
    for (let i = 0; i < groups.length; i++)
    {
        groups[i].disabled = false;
    }
    for (let i = 0; i < academicCourses.length; i++)
    {
        let course = academicCourses[i];
        addCoordinatorOption("OfferCourse", course.code, course.code + " - " + course.title);
    }
    for (let i = 0; i < academicSemesters.length; i++)
    {
        addCoordinatorOption("OfferSemester", academicSemesters[i], academicSemesters[i]);
        addCoordinatorOption("FilterSemester", academicSemesters[i], academicSemesters[i]);
    }
    for (let i = 0; i < academicFaculty.length; i++)
    {
        addCoordinatorOption("OfferFaculty", academicFaculty[i], academicFaculty[i]);
    }
    for (let i = 0; i < academicSchedules.length; i++)
    {
        addCoordinatorOption("OfferSchedule", academicSchedules[i], academicSchedules[i]);
    }
    for (let i = 0; i < academicDepartments.length; i++)
    {
        addCoordinatorOption("FilterDepartment", academicDepartments[i], academicDepartments[i]);
    }
    renderSemesterSchedule("", "");
    renderCoordinatorOverview();
    initializeDashboard("overview");
}

function validateOfferingSection()
{
    let section = document.getElementById("OfferSection").value.trim().toUpperCase();
    if (!/^[A-Z][0-9]?$/.test(section))
    {
        showError("OfferSection", "Use one letter with an optional digit, such as A or B1.");
        return false;
    }
    clearError("OfferSection");
    return true;
}

function validateOfferingCombination(courseIsValid, semesterIsValid, sectionIsValid)
{
    if (!courseIsValid || !semesterIsValid || !sectionIsValid)
    {
        return true; // The individual field already explains its error.
    }
    let code = document.getElementById("OfferCourse").value;
    let semester = document.getElementById("OfferSemester").value;
    let section = document.getElementById("OfferSection").value.trim().toUpperCase();
    for (let i = 0; i < academicOfferings.length; i++)
    {
        let offering = academicOfferings[i];
        if (offering.courseCode === code && offering.semester === semester && offering.section === section)
        {
            showError("OfferSection", "This course, semester and section already have an offering.");
            return false;
        }
    }
    return true;
}

function validateFacultySchedule(semesterIsValid, facultyIsValid, scheduleIsValid)
{
    if (!semesterIsValid || !facultyIsValid || !scheduleIsValid)
    {
        return true;
    }
    let semester = document.getElementById("OfferSemester").value;
    let faculty = document.getElementById("OfferFaculty").value;
    let schedule = document.getElementById("OfferSchedule").value;
    for (let i = 0; i < academicOfferings.length; i++)
    {
        let offering = academicOfferings[i];
        if (offering.semester === semester && offering.faculty === faculty && offering.schedule === schedule)
        {
            showError("OfferSchedule", "This faculty member already has a class in that semester and time slot.");
            return false;
        }
    }
    return true;
}

function validateCourseOfferingForm()
{
    clearResult("OfferingResult");
    // Run all field checks before combining their results.
    let validCourse = validateSelect("OfferCourse", coordinatorCourseCodes(), "a course");
    let validSemester = validateSelect("OfferSemester", academicSemesters, "a semester");
    let validSection = validateOfferingSection();
    let validFaculty = validateSelect("OfferFaculty", academicFaculty, "a faculty member");
    let validSeats = validateNumber("OfferSeats", "available seats", 1, 60, true);
    let validSchedule = validateSelect("OfferSchedule", academicSchedules, "a class schedule");
    let validCombination = validateOfferingCombination(validCourse, validSemester, validSection);
    let validFacultyTime = validateFacultySchedule(validSemester, validFaculty, validSchedule);
    let isValid = validCourse && validSemester && validSection && validFaculty &&
                  validSeats && validSchedule && validCombination && validFacultyTime;
    if (isValid)
    {
        let offering = {
            courseCode: document.getElementById("OfferCourse").value,
            semester: document.getElementById("OfferSemester").value,
            section: document.getElementById("OfferSection").value.trim().toUpperCase(),
            faculty: document.getElementById("OfferFaculty").value,
            seats: Number(document.getElementById("OfferSeats").value),
            schedule: document.getElementById("OfferSchedule").value
        };
        academicOfferings.push(offering);
        renderCoordinatorOverview();
        // Keep the current filters. A new offering might be outside their results.
        filterSemesterSchedule();
        showResult("OfferingResult", true, "Offering added temporarily on this page. The schedule table uses your current filters; clear them to see all offerings.");
    }
    else
    {
        showResult("OfferingResult", false, "Please correct the marked fields.");
        focusFirstError("CourseOfferingForm");
    }
    return false;
}

function resetCourseOfferingForm()
{
    clearFormErrors("CourseOfferingForm", "OfferingResult");
}

function renderSemesterSchedule(semester, department)
{
    let rows = document.getElementById("ScheduleRows");
    rows.textContent = "";
    let matches = 0;
    for (let i = 0; i < academicOfferings.length; i++)
    {
        let offering = academicOfferings[i];
        let course = getAcademicCourse(offering.courseCode);
        if (course && (semester === "" || offering.semester === semester) &&
            (department === "" || course.department === department))
        {
            let row = document.createElement("tr");
            let values = [course.code, course.title, course.department, offering.semester,
                          offering.section, offering.faculty, offering.seats, offering.schedule];
            for (let j = 0; j < values.length; j++)
            {
                let cell = document.createElement("td");
                cell.textContent = values[j];
                row.appendChild(cell);
            }
            rows.appendChild(row);
            matches++;
        }
    }
    let message = matches + " offering(s) shown.";
    if (matches === 0)
    {
        message = "No course offerings match these filters.";
    }
    document.getElementById("ScheduleCount").textContent = message;
    return matches;
}

function filterSemesterSchedule()
{
    let validSemester = validateSelect("FilterSemester", [""].concat(academicSemesters), "a semester or All semesters");
    let validDepartment = validateSelect("FilterDepartment", [""].concat(academicDepartments), "a department or All departments");
    if (validSemester && validDepartment)
    {
        let count = renderSemesterSchedule(document.getElementById("FilterSemester").value,
                                          document.getElementById("FilterDepartment").value);
        showResult("FilterResult", true, count + " offering(s) match your filters.");
    }
    else
    {
        document.getElementById("ScheduleRows").textContent = "";
        document.getElementById("ScheduleCount").textContent = "Choose valid filters to display the schedule.";
        showResult("FilterResult", false, "Please select filters from the lists.");
        focusFirstError("ScheduleFilterForm");
    }
    return false;
}

function resetScheduleFilters()
{
    clearFormErrors("ScheduleFilterForm", "FilterResult");
    // Set the known default before rendering; native reset happens after this handler.
    document.getElementById("FilterSemester").value = "";
    document.getElementById("FilterDepartment").value = "";
    renderSemesterSchedule("", "");
}


function addCoordinatorCell(row, value)
{
    let cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
}

function renderCoordinatorOverview()
{
    let semesters = [];
    let seats = 0;
    for (let i = 0; i < academicOfferings.length; i++)
    {
        let offering = academicOfferings[i];
        seats += offering.seats;
        if (semesters.indexOf(offering.semester) === -1) { semesters.push(offering.semester); }
    }
    document.getElementById("CoordinatorOfferingCount").textContent = academicOfferings.length;
    document.getElementById("CoordinatorSemesterCount").textContent = semesters.length;
    document.getElementById("CoordinatorFacultyCount").textContent = academicFaculty.length;
    document.getElementById("CoordinatorSeatCount").textContent = seats;
    let rows = document.getElementById("CoordinatorOverviewRows");
    rows.textContent = "";
    for (let i = 0; i < academicOfferings.length && i < 5; i++)
    {
        let offering = academicOfferings[i];
        let row = document.createElement("tr");
        addCoordinatorCell(row, offering.courseCode);
        addCoordinatorCell(row, offering.semester);
        addCoordinatorCell(row, offering.section);
        addCoordinatorCell(row, offering.seats);
        rows.appendChild(row);
    }
    let facultyRows = document.getElementById("CoordinatorFacultyRows");
    facultyRows.textContent = "";
    for (let i = 0; i < academicFaculty.length; i++)
    {
        let count = 0;
        let assignedSemesters = [];
        for (let j = 0; j < academicOfferings.length; j++)
        {
            let offering = academicOfferings[j];
            if (offering.faculty === academicFaculty[i])
            {
                count++;
                if (assignedSemesters.indexOf(offering.semester) === -1) { assignedSemesters.push(offering.semester); }
            }
        }
        let row = document.createElement("tr");
        addCoordinatorCell(row, academicFaculty[i]);
        addCoordinatorCell(row, count);
        addCoordinatorCell(row, assignedSemesters.join(", ") || "None");
        facultyRows.appendChild(row);
    }
}
