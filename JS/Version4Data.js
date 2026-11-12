// A complete fictional 120-credit teaching curriculum. It is not AIUB policy.
let additionalDemoCourses = [
    { code: "MAT102", title: "Calculus II", prerequisite: "MAT101", category: "Core" },
    { code: "MAT201", title: "Linear Algebra", prerequisite: "MAT102", category: "Core" },
    { code: "MAT202", title: "Discrete Mathematics", prerequisite: "MAT101", category: "Core" },
    { code: "MAT203", title: "Probability and Statistics", prerequisite: "MAT102", category: "Core" },
    { code: "PHY101", title: "Physics I", prerequisite: "", category: "Core" },
    { code: "PHY102", title: "Physics II", prerequisite: "PHY101", category: "Core" },
    { code: "ENG102", title: "Professional Communication", prerequisite: "ENG101", category: "Core" },
    { code: "CSE103", title: "Object Oriented Programming", prerequisite: "CSE102", category: "Core" },
    { code: "CSE104", title: "Computer Architecture", prerequisite: "CSE101", category: "Core" },
    { code: "CSE203", title: "Algorithms", prerequisite: "CSE201", category: "Core" },
    { code: "CSE204", title: "Digital Logic", prerequisite: "CSE101", category: "Core" },
    { code: "CSE205", title: "Operating Systems", prerequisite: "CSE104", category: "Core" },
    { code: "CSE206", title: "Computer Networks", prerequisite: "CSE104", category: "Core" },
    { code: "CSE207", title: "Software Engineering", prerequisite: "CSE201", category: "Core" },
    { code: "CSE208", title: "Theory of Computation", prerequisite: "CSE201", category: "Core" },
    { code: "HUM101", title: "Professional Ethics", prerequisite: "", category: "Core" },
    { code: "CSE302", title: "Artificial Intelligence", prerequisite: "CSE203", category: "Major" },
    { code: "CSE303", title: "Advanced Database Systems", prerequisite: "CSE202", category: "Major" },
    { code: "CSE304", title: "Cybersecurity", prerequisite: "CSE206", category: "Major" },
    { code: "CSE305", title: "Human Computer Interaction", prerequisite: "CSE103", category: "Major" },
    { code: "CSE306", title: "Data Science", prerequisite: "MAT203", category: "Major" },
    { code: "CSE307", title: "Machine Learning", prerequisite: "CSE302", category: "Major" },
    { code: "CSE308", title: "Distributed Systems", prerequisite: "CSE205", category: "Major" },
    { code: "CSE309", title: "Software Quality Assurance", prerequisite: "CSE207", category: "Major" },
    { code: "CSE401", title: "Capstone Project I", prerequisite: "CSE207", category: "Major" },
    { code: "CSE402", title: "Capstone Project II", prerequisite: "CSE401", category: "Major" },
    { code: "CSE403", title: "Compiler Design", prerequisite: "CSE208", category: "Major" },
    { code: "CSE404", title: "Cloud Computing", prerequisite: "CSE206", category: "Major" },
    { code: "CSE405", title: "Computer Graphics", prerequisite: "CSE103", category: "Elective" },
    { code: "CSE406", title: "Mobile Application Development", prerequisite: "CSE103", category: "Elective" },
    { code: "CSE407", title: "Internet of Things", prerequisite: "CSE206", category: "Elective" }
];
for (let i = 0; i < academicCourses.length; i++)
{
    academicCourses[i].category = academicCourses[i].code === "BBA101" ? "Elective" : "Core";
}
for (let i = 0; i < additionalDemoCourses.length; i++)
{
    let course = additionalDemoCourses[i];
    course.credits = 3;
    course.department = course.code.indexOf("CSE") === 0 ? "CSE" : "General";
    academicCourses.push(course);
}
let demoCurriculumCodes = [];
for (let i = 0; i < academicCourses.length; i++) { demoCurriculumCodes.push(academicCourses[i].code); }
let demoCategories = ["Core", "Major", "Elective"];
let demoIncompleteCore = ["CSE301", "PHY102", "ENG102", "CSE208", "HUM101"];
let demoCompletedMajor = ["CSE303", "CSE304", "CSE305", "CSE306", "CSE308", "CSE309"];
academicStudents[0].completed = [];
for (let i = 0; i < academicCourses.length; i++)
{
    let course = academicCourses[i];
    if ((course.category === "Core" && demoIncompleteCore.indexOf(course.code) === -1) ||
        demoCompletedMajor.indexOf(course.code) !== -1 || course.code === "BBA101")
    {
        academicStudents[0].completed.push(course.code);
    }
}
// Grade records cover every completed course. Cards and transcript use the same records.
let demoTranscripts = [];
for (let i = 0; i < academicStudents.length; i++)
{
    let student = academicStudents[i];
    let grades = [];
    for (let j = 0; j < student.completed.length; j++)
    {
        let grade = i === 0 && j >= 18 ? "C+" : "A";
        grades.push({ code: student.completed[j], grade: grade });
    }
    demoTranscripts.push({ studentId: student.id, grades: grades });
}
getAcademicCourse("CSE301").prerequisites = ["CSE202", "CSE201", "CSE103"];
getAcademicCourse("CSE301").minimumCredits = 60;
getAcademicCourse("CSE401").minimumCredits = 90;
academicSchedules.push("Sunday / Tuesday 16:00-17:30", "Monday / Wednesday 16:00-17:30");
let demoExtraOfferings = [
    ["CSE301", "Mr. Imran Hossain", "Monday / Wednesday 09:00-10:30"],
    ["CSE302", "Dr. Farhana Ahmed", "Monday / Wednesday 14:00-15:30"],
    ["CSE401", "Ms. Tasnim Rahman", "Sunday / Tuesday 09:00-10:30"],
    ["CSE404", "Mr. Imran Hossain", "Sunday / Tuesday 16:00-17:30"],
    ["CSE405", "Dr. Farhana Ahmed", "Sunday / Tuesday 16:00-17:30"],
    ["CSE406", "Ms. Tasnim Rahman", "Sunday / Tuesday 16:00-17:30"],
    ["ENG102", "Ms. Tasnim Rahman", "Monday / Wednesday 16:00-17:30"],
    ["CSE407", "Ms. Tasnim Rahman", "Sunday / Tuesday 11:00-12:30"]
];
for (let i = 0; i < demoExtraOfferings.length; i++)
{
    academicOfferings.push({ courseCode: demoExtraOfferings[i][0], semester: "Fall 2026", section: "A", faculty: demoExtraOfferings[i][1], seats: 30, schedule: demoExtraOfferings[i][2] });
}
// Keep the sample plans valid for their students and semester offerings.
academicPlans[0].courses = ["CSE301", "CSE302"];

function getDemoGradePoints(letter)
{
    for (let i = 0; i < academicGrades.length; i++)
    {
        if (academicGrades[i].letter === letter) { return academicGrades[i].points; }
    }
    return 0;
}

function getDemoProgress(studentId)
{
    let student = getAcademicStudent(studentId);
    let completed = student ? student.completed : [];
    let result = { credits: 0, totalCredits: 0, remaining: 0, percent: 0, completedCount: 0, courseCount: demoCurriculumCodes.length, gpa: 0, categories: [] };
    for (let i = 0; i < demoCategories.length; i++)
    {
        let group = { name: demoCategories[i], completedCredits: 0, requiredCredits: 0, completedCount: 0, requiredCount: 0 };
        for (let j = 0; j < demoCurriculumCodes.length; j++)
        {
            let course = getAcademicCourse(demoCurriculumCodes[j]);
            if (course.category === group.name)
            {
                group.requiredCredits += course.credits;
                group.requiredCount++;
                if (completed.indexOf(course.code) !== -1)
                {
                    group.completedCredits += course.credits;
                    group.completedCount++;
                }
            }
        }
        result.categories.push(group);
        result.credits += group.completedCredits;
        result.totalCredits += group.requiredCredits;
        result.completedCount += group.completedCount;
    }
    let weighted = 0;
    for (let i = 0; i < demoTranscripts.length; i++)
    {
        if (demoTranscripts[i].studentId === studentId)
        {
            for (let j = 0; j < demoTranscripts[i].grades.length; j++)
            {
                let record = demoTranscripts[i].grades[j];
                let course = getAcademicCourse(record.code);
                if (course && completed.indexOf(record.code) !== -1) { weighted += course.credits * getDemoGradePoints(record.grade); }
            }
        }
    }
    result.remaining = result.totalCredits - result.credits;
    result.percent = result.totalCredits > 0 ? Math.round(result.credits * 100 / result.totalCredits) : 0;
    result.gpa = result.credits > 0 ? weighted / result.credits : 0;
    return result;
}

function getCourseEligibility(code, completed)
{
    let course = getAcademicCourse(code);
    let result = { eligible: false, completed: false, prerequisites: [], missing: [], credits: 0, minimumCredits: 0, reason: "Choose a known sample course." };
    if (!course) { return result; }
    result.completed = completed.indexOf(code) !== -1;
    result.prerequisites = course.prerequisites || (course.prerequisite ? [course.prerequisite] : []);
    result.minimumCredits = course.minimumCredits || 0;
    let seen = [];
    for (let i = 0; i < completed.length; i++)
    {
        let passed = getAcademicCourse(completed[i]);
        if (passed && seen.indexOf(passed.code) === -1) { result.credits += passed.credits; seen.push(passed.code); }
    }
    for (let i = 0; i < result.prerequisites.length; i++)
    {
        if (completed.indexOf(result.prerequisites[i]) === -1) { result.missing.push(result.prerequisites[i]); }
    }
    if (result.completed) { result.reason = "This course is already completed."; }
    else if (result.missing.length > 0) { result.reason = "Complete " + result.missing.join(", ") + " first."; }
    else if (result.credits < result.minimumCredits) { result.reason = "Earn at least " + result.minimumCredits + " credits first; you have " + result.credits + "."; }
    else { result.eligible = true; result.reason = "All prerequisites and the minimum credit requirement are met."; }
    return result;
}
