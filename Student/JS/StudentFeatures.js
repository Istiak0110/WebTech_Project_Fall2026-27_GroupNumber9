// Version 4 adds views around the existing Version 3 calculator and forms.
function loadStudentFeatures()
{
    let select = document.getElementById("PrerequisiteCourse");
    for (let i = 0; i < academicCourses.length; i++)
    {
        let option = document.createElement("option");
        option.value = academicCourses[i].code;
        option.textContent = academicCourses[i].code + " — " + academicCourses[i].title;
        select.appendChild(option);
    }
    document.getElementById("PlannerSemester").value = academicSemesters[0];
    document.getElementById("PlannerHeaderLimit").textContent = semesterCreditLimit;
    loadPlannerCourses();
    renderStudentOverview();
    renderGraduationTracker();
    renderSampleRecommendations();
    resetAcademicAssistant();
    initializeDashboard("overview");
}

function renderStudentOverview()
{
    let student = academicStudents[0];
    let progress = getDemoProgress(student.id);
    document.getElementById("OverviewGPA").textContent = progress.gpa.toFixed(2);
    document.getElementById("OverviewCredits").textContent = progress.credits + " / " + progress.totalCredits;
    document.getElementById("OverviewPercent").textContent = progress.percent + "% completed";
    document.getElementById("OverviewCompleted").textContent = progress.completedCount;
    document.getElementById("OverviewRemaining").textContent = progress.remaining;
    document.getElementById("OverviewDegreePercent").textContent = progress.percent + "% Complete";
    document.getElementById("OverviewDegreeCredits").textContent = progress.credits + " of " + progress.totalCredits + " credits completed";
    document.getElementById("OverviewProgress").value = progress.percent;
    document.getElementById("OverviewProgress").textContent = progress.percent + "%";
    document.getElementById("OverviewProgress").setAttribute("aria-label", "Sample degree completion");
    let categories = document.getElementById("OverviewCategories");
    categories.textContent = "";
    for (let i = 0; i < progress.categories.length; i++)
    {
        let group = progress.categories[i];
        let line = document.createElement("p");
        line.textContent = group.name + " courses: " + group.completedCount + " / " + group.requiredCount;
        categories.appendChild(line);
    }
    document.getElementById("OverviewAlerts").textContent = "";
    document.getElementById("AllAcademicAlerts").textContent = "";
    let alerts = [
        progress.remaining + " credits remain in the sample curriculum.",
        "Capstone Project I requires 90 earned credits. Current sample credits: " + progress.credits + ".",
        "The sample semester credit limit is " + semesterCreditLimit + "."
    ];
    for (let i = 0; i < alerts.length; i++)
    {
        for (let j = 0; j < 2; j++)
        {
            let item = document.createElement("li");
            item.textContent = alerts[i];
            document.getElementById(j === 0 ? "OverviewAlerts" : "AllAcademicAlerts").appendChild(item);
        }
    }
}

function getOfferedSemester(code, preferred)
{
    let courses = getSemesterCourses(preferred);
    for (let i = 0; i < courses.length; i++)
    {
        if (courses[i].code === code) { return preferred; }
    }
    for (let i = 0; i < academicOfferings.length; i++)
    {
        if (academicOfferings[i].courseCode === code) { return academicOfferings[i].semester; }
    }
    return "";
}

function renderSampleRecommendations()
{
    let student = academicStudents[0];
    let cards = document.getElementById("SampleRecommendationCards");
    let preview = document.getElementById("OverviewRecommendations");
    cards.textContent = "";
    preview.textContent = "";
    let previewCount = 0;
    for (let i = 0; i < academicCourses.length; i++)
    {
        let course = academicCourses[i];
        let eligibility = getCourseEligibility(course.code, student.completed);
        if (!eligibility.eligible) { continue; }
        let card = document.createElement("article");
        card.className = "course-card";
        let heading = document.createElement("h3");
        heading.textContent = course.title;
        let meta = document.createElement("p");
        meta.className = "small-note";
        meta.textContent = course.code + " · " + course.credits + " credits";
        let tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = course.category + " Course";
        let reason = document.createElement("p");
        reason.className = "status-good";
        reason.textContent = "✓ " + eligibility.reason;
        let button = document.createElement("button");
        button.type = "button";
        button.value = course.code;
        let semester = getOfferedSemester(course.code, academicSemesters[0]);
        button.textContent = semester ? "+ Add to Plan" : "No sample offering";
        if (semester)
        {
            button.onclick = function () { addRecommendationToPlan(this.value); };
        }
        else
        {
            button.disabled = true;
            let note = document.createElement("p");
            note.className = "small-note";
            note.textContent = "Prerequisites are met, but this course has no offering in the sample schedule.";
            card.appendChild(note);
        }
        card.appendChild(heading);
        card.appendChild(meta);
        card.appendChild(tag);
        card.appendChild(reason);
        card.appendChild(button);
        cards.appendChild(card);
        if (semester && previewCount < 3)
        {
            let item = document.createElement("div");
            item.className = "course-card";
            let name = document.createElement("strong");
            name.textContent = course.title;
            let small = document.createElement("p");
            small.className = "small-note";
            small.textContent = course.code + " · " + course.credits + " credits · Prerequisites met";
            item.appendChild(name);
            item.appendChild(small);
            preview.appendChild(item);
            previewCount++;
        }
    }
}

function addRecommendationToPlan(code)
{
    let course = getAcademicCourse(code);
    let eligibility = getCourseEligibility(code, academicStudents[0].completed);
    if (!course || !eligibility.eligible)
    {
        showResult("RecommendationCardMessage", false, eligibility.reason);
        return false;
    }
    let current = document.getElementById("PlannerSemester").value;
    let semester = getOfferedSemester(code, current);
    if (semester === "")
    {
        showResult("RecommendationCardMessage", false, "This course has no sample offering to add to a plan.");
        return false;
    }
    let selected = getCheckedValues("plannerCourse");
    // Changing semester would discard the existing plan, so ask the user to choose it first.
    if (current !== "" && current !== semester && selected.length > 0)
    {
        showResult("RecommendationCardMessage", false, "This course is offered in " + semester + ". Reset your current plan or choose that semester before adding it.");
        return false;
    }
    if (current !== semester)
    {
        document.getElementById("PlannerSemester").value = semester;
        loadPlannerCourses();
        selected = [];
    }
    let checkbox = document.getElementById("PlannerCourse" + code);
    if (!checkbox)
    {
        showResult("RecommendationCardMessage", false, "Select a semester in which this course is offered.");
        return false;
    }
    if (checkbox.checked)
    {
        showResult("RecommendationCardMessage", false, "This course is already in your selected plan.");
        return false;
    }
    let credits = course.credits;
    for (let i = 0; i < selected.length; i++)
    {
        let selectedCourse = getAcademicCourse(selected[i]);
        if (selectedCourse) { credits += selectedCourse.credits; }
    }
    if (credits > semesterCreditLimit)
    {
        showResult("RecommendationCardMessage", false, "Adding this course would exceed the " + semesterCreditLimit + "-credit demo limit.");
        return false;
    }
    checkbox.checked = true;
    updatePlannerCredits();
    showResult("RecommendationCardMessage", true, course.code + " was added to the " + semester + " plan.");
    showResult("PlannerAddMessage", true, course.code + " added. Review your selections and choose Prepare plan.");
    showDashboardSection("semester-planner");
    return false;
}

function clearPrerequisiteResult()
{
    clearResult("PrerequisiteResult");
    document.getElementById("EligibilityExplanation").textContent = "Choose a course to see its requirements.";
    document.getElementById("EligibilityRequirements").textContent = "";
}

function checkPrerequisite()
{
    clearPrerequisiteResult();
    let codes = [];
    for (let i = 0; i < academicCourses.length; i++) { codes.push(academicCourses[i].code); }
    if (!validateSelect("PrerequisiteCourse", codes, "a course"))
    {
        showResult("PrerequisiteResult", false, "Select a course from the sample catalog.");
        focusFirstError("PrerequisiteForm");
        return false;
    }
    let code = document.getElementById("PrerequisiteCourse").value;
    let course = getAcademicCourse(code);
    let completed = academicStudents[0].completed;
    let result = getCourseEligibility(code, completed);
    showResult("PrerequisiteResult", result.eligible, result.eligible ? "You meet the sample requirements for " + code + "." : result.reason);
    document.getElementById("EligibilityExplanation").textContent = course.code + " — " + course.title + ": " + result.reason;
    let list = document.createElement("ul");
    for (let i = 0; i < result.prerequisites.length; i++)
    {
        let requirement = getAcademicCourse(result.prerequisites[i]);
        let item = document.createElement("li");
        let passed = completed.indexOf(result.prerequisites[i]) !== -1;
        item.className = passed ? "status-good" : "status-warn";
        item.textContent = requirement.code + " — " + requirement.title + (passed ? " · Completed" : " · Not completed");
        list.appendChild(item);
    }
    if (result.prerequisites.length === 0)
    {
        let item = document.createElement("li");
        item.textContent = "No prerequisite courses are required.";
        list.appendChild(item);
    }
    let credits = document.createElement("p");
    credits.textContent = "Minimum earned credits: " + result.minimumCredits + ". Sample credits earned: " + result.credits + ".";
    document.getElementById("EligibilityRequirements").appendChild(list);
    document.getElementById("EligibilityRequirements").appendChild(credits);
    return false;
}

function resetPrerequisiteForm()
{
    clearFormErrors("PrerequisiteForm", "PrerequisiteResult");
    clearPrerequisiteResult();
}

function renderGraduationTracker()
{
    let student = academicStudents[0];
    let progress = getDemoProgress(student.id);
    document.getElementById("GraduationPercent").textContent = progress.percent + "% Complete";
    document.getElementById("GraduationCredits").textContent = progress.credits + " / " + progress.totalCredits;
    document.getElementById("GraduationRemaining").textContent = progress.remaining;
    document.getElementById("GraduationProgress").value = progress.percent;
    document.getElementById("GraduationProgress").textContent = progress.percent + "%";
    document.getElementById("GraduationProgress").setAttribute("aria-label", "Sample graduation progress");
    document.getElementById("GraduationReadiness").textContent = progress.remaining === 0 ? "All sample curriculum credits are complete. This is not official graduation clearance." : "Complete " + progress.remaining + " more credits to finish the sample curriculum.";
    let groups = document.getElementById("GraduationCategories");
    groups.textContent = "";
    for (let i = 0; i < progress.categories.length; i++)
    {
        let category = progress.categories[i];
        let card = document.createElement("article");
        card.className = "course-card";
        let title = document.createElement("h3");
        title.textContent = category.name + " Courses";
        let totals = document.createElement("p");
        totals.textContent = category.completedCount + " / " + category.requiredCount + " courses · " + category.completedCredits + " / " + category.requiredCredits + " credits";
        let remaining = document.createElement("p");
        remaining.className = "status-warn";
        remaining.textContent = (category.requiredCount - category.completedCount) + " courses remaining";
        card.appendChild(title);
        card.appendChild(totals);
        card.appendChild(remaining);
        groups.appendChild(card);
    }
    let list = document.getElementById("GraduationCourseList");
    list.textContent = "";
    for (let i = 0; i < demoCurriculumCodes.length; i++)
    {
        let course = getAcademicCourse(demoCurriculumCodes[i]);
        if (student.completed.indexOf(course.code) === -1)
        {
            let item = document.createElement("li");
            item.textContent = course.code + " — " + course.title + " (" + course.category + ", " + course.credits + " credits)";
            list.appendChild(item);
        }
    }
}

function appendAssistantMessage(text, fromUser)
{
    let message = document.createElement("p");
    message.className = fromUser ? "chat-message user" : "chat-message";
    message.textContent = text;
    document.getElementById("AssistantMessages").appendChild(message);
    let log = document.getElementById("AssistantMessages");
    log.scrollTop = log.scrollHeight;
}

function getAcademicAssistantReply(question)
{
    let text = question.toLowerCase();
    let match = question.toUpperCase().match(/\b(?:CSE|MAT|PHY|ENG|BBA|EEE|HUM)\s?[0-9]{3}\b/);
    if (match)
    {
        let code = match[0].replace(/\s/g, "");
        let course = getAcademicCourse(code);
        if (!course) { return "That code is not in the sample catalog. Choose a listed course in the Prerequisite Checker."; }
        return course.code + " — " + course.title + ": " + getCourseEligibility(code, academicStudents[0].completed).reason;
    }
    let progress = getDemoProgress(academicStudents[0].id);
    if (text.indexOf("limit") !== -1 || text.indexOf("load") !== -1)
    {
        return "The sample semester credit limit is " + semesterCreditLimit + ". Review your total in Semester Planner before preparing a plan.";
    }
    if (text.indexOf("graduat") !== -1 || text.indexOf("requirement") !== -1 || text.indexOf("left") !== -1 || text.indexOf("credits") !== -1)
    {
        return "The sample record has " + progress.credits + " of " + progress.totalCredits + " credits and " + progress.remaining + " remaining. Open Graduation Tracker for Core, Major and Elective requirements.";
    }
    if (text.indexOf("gpa") !== -1 || text.indexOf("grade") !== -1)
    {
        return "The sample transcript GPA is " + progress.gpa.toFixed(2) + ". The calculator uses credits multiplied by sample grade points, divided by total credits. It does not apply official retake policy.";
    }
    if (text.indexOf("prerequisite") !== -1 || text.indexOf("eligible") !== -1)
    {
        return "Use Prerequisite Checker to select a course. It checks every listed prerequisite and any minimum earned-credit rule against Amina's sample profile.";
    }
    if (text.indexOf("course") !== -1 || text.indexOf("semester") !== -1 || text.indexOf("plan") !== -1)
    {
        let suggestions = [];
        for (let i = 0; i < academicCourses.length && suggestions.length < 3; i++)
        {
            let course = academicCourses[i];
            if (getCourseEligibility(course.code, academicStudents[0].completed).eligible && getOfferedSemester(course.code, academicSemesters[0])) { suggestions.push(course.code + " " + course.title); }
        }
        return "Sample eligible choices include " + suggestions.join(", ") + ". Use Course Recommendations to add an offered course to your plan.";
    }
    return "I use predefined responses for this frontend demo. Ask about courses, a course code, prerequisites, GPA, semester credit limits, or graduation requirements.";
}

function askAcademicAssistant()
{
    clearResult("AssistantResult");
    if (!validateTextLength("AssistantQuestion", "a question", 2, 300))
    {
        showResult("AssistantResult", false, "Enter a question using 2 to 300 characters.");
        focusFirstError("AssistantForm");
        return false;
    }
    let question = document.getElementById("AssistantQuestion").value.trim();
    appendAssistantMessage(question, true);
    appendAssistantMessage(getAcademicAssistantReply(question), false);
    document.getElementById("AssistantQuestion").value = "";
    return false;
}

function askSuggestedQuestion(question)
{
    document.getElementById("AssistantQuestion").value = question;
    return askAcademicAssistant();
}

function resetAcademicAssistant()
{
    clearFormErrors("AssistantForm", "AssistantResult");
    document.getElementById("AssistantMessages").textContent = "";
    appendAssistantMessage("Hi Amina! How can I help with your academic planning? Choose a suggested question or type your own. Responses use predefined sample rules.", false);
}
