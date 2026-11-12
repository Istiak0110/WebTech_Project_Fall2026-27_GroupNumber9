// Fictional teaching data. Each dashboard gets a fresh copy when its page opens.
let semesterCreditLimit = 18;
let academicSemesters = ["Fall 2026", "Spring 2027", "Summer 2027"];
let academicDepartments = ["CSE", "EEE", "BBA", "General"];
let academicGrades = [
    { letter: "A+", points: 4.00 }, { letter: "A", points: 3.75 },
    { letter: "B+", points: 3.50 }, { letter: "B", points: 3.25 },
    { letter: "C+", points: 3.00 }, { letter: "C", points: 2.75 },
    { letter: "D+", points: 2.50 }, { letter: "D", points: 2.25 },
    { letter: "F", points: 0.00 }
];
let academicCourses = [
    { code: "CSE101", title: "Introduction to Computing", credits: 3, department: "CSE", prerequisite: "" },
    { code: "CSE102", title: "Programming Fundamentals", credits: 3, department: "CSE", prerequisite: "CSE101" },
    { code: "CSE201", title: "Data Structures", credits: 3, department: "CSE", prerequisite: "CSE102" },
    { code: "CSE202", title: "Database Systems", credits: 3, department: "CSE", prerequisite: "CSE102" },
    { code: "CSE301", title: "Web Technologies", credits: 3, department: "CSE", prerequisite: "CSE202" },
    { code: "MAT101", title: "Mathematics I", credits: 3, department: "General", prerequisite: "" },
    { code: "ENG101", title: "English Communication", credits: 3, department: "General", prerequisite: "" },
    { code: "BBA101", title: "Introduction to Business", credits: 3, department: "BBA", prerequisite: "" },
    { code: "EEE101", title: "Basic Electrical Circuits", credits: 3, department: "EEE", prerequisite: "" }
];
let academicStudents = [
    { id: "26-12345-3", name: "Amina Rahman", email: "amina@example.com", department: "CSE", completed: ["CSE101", "MAT101", "ENG101"] },
    { id: "26-12346-3", name: "Tanvir Hasan", email: "tanvir@example.com", department: "CSE", completed: ["CSE101", "CSE102", "MAT101"] },
    { id: "26-12347-3", name: "Nadia Islam", email: "nadia@example.com", department: "EEE", completed: ["MAT101", "EEE101"] },
    { id: "26-12348-3", name: "Rafi Ahmed", email: "rafi@example.com", department: "BBA", completed: ["ENG101", "BBA101"] }
];
let academicFaculty = ["Dr. Farhana Ahmed", "Mr. Imran Hossain", "Ms. Tasnim Rahman"];
let academicSchedules = ["Sunday / Tuesday 09:00-10:30", "Sunday / Tuesday 11:00-12:30", "Monday / Wednesday 09:00-10:30", "Monday / Wednesday 14:00-15:30"];
let academicOfferings = [
    { courseCode: "CSE101", semester: "Fall 2026", section: "A", faculty: "Mr. Imran Hossain", seats: 35, schedule: "Sunday / Tuesday 09:00-10:30" },
    { courseCode: "CSE102", semester: "Fall 2026", section: "A", faculty: "Dr. Farhana Ahmed", seats: 30, schedule: "Sunday / Tuesday 11:00-12:30" },
    { courseCode: "CSE201", semester: "Fall 2026", section: "A", faculty: "Dr. Farhana Ahmed", seats: 25, schedule: "Monday / Wednesday 09:00-10:30" },
    { courseCode: "CSE202", semester: "Fall 2026", section: "A", faculty: "Ms. Tasnim Rahman", seats: 30, schedule: "Monday / Wednesday 14:00-15:30" },
    { courseCode: "MAT101", semester: "Fall 2026", section: "A", faculty: "Mr. Imran Hossain", seats: 40, schedule: "Monday / Wednesday 14:00-15:30" },
    { courseCode: "ENG101", semester: "Fall 2026", section: "A", faculty: "Ms. Tasnim Rahman", seats: 35, schedule: "Monday / Wednesday 09:00-10:30" },
    { courseCode: "BBA101", semester: "Fall 2026", section: "A", faculty: "Mr. Imran Hossain", seats: 35, schedule: "Sunday / Tuesday 11:00-12:30" },
    { courseCode: "CSE102", semester: "Spring 2027", section: "A", faculty: "Ms. Tasnim Rahman", seats: 35, schedule: "Monday / Wednesday 09:00-10:30" },
    { courseCode: "CSE202", semester: "Spring 2027", section: "A", faculty: "Dr. Farhana Ahmed", seats: 30, schedule: "Sunday / Tuesday 11:00-12:30" },
    { courseCode: "CSE301", semester: "Spring 2027", section: "A", faculty: "Mr. Imran Hossain", seats: 25, schedule: "Monday / Wednesday 14:00-15:30" },
    { courseCode: "EEE101", semester: "Spring 2027", section: "A", faculty: "Ms. Tasnim Rahman", seats: 30, schedule: "Sunday / Tuesday 09:00-10:30" },
    { courseCode: "CSE201", semester: "Summer 2027", section: "A", faculty: "Dr. Farhana Ahmed", seats: 25, schedule: "Sunday / Tuesday 09:00-10:30" },
    { courseCode: "MAT101", semester: "Summer 2027", section: "A", faculty: "Mr. Imran Hossain", seats: 30, schedule: "Monday / Wednesday 14:00-15:30" }
];
let academicPlans = [
    { id: "PLAN-1", studentId: "26-12345-3", semester: "Fall 2026", courses: ["CSE102", "BBA101"], status: "Pending" },
    { id: "PLAN-2", studentId: "26-12346-3", semester: "Spring 2027", courses: ["CSE202", "EEE101"], status: "Needs Revision" },
    { id: "PLAN-3", studentId: "26-12346-3", semester: "Summer 2027", courses: ["CSE201"], status: "Approved" }
];

function getAcademicCourse(code)
{
    for (let i = 0; i < academicCourses.length; i++)
    {
        if (academicCourses[i].code === code) { return academicCourses[i]; }
    }
    return null;
}

function getAcademicStudent(id)
{
    for (let i = 0; i < academicStudents.length; i++)
    {
        if (academicStudents[i].id === id) { return academicStudents[i]; }
    }
    return null;
}

function getSemesterCourses(semester)
{
    let courses = [];
    let seen = [];
    for (let i = 0; i < academicOfferings.length; i++)
    {
        let offering = academicOfferings[i];
        if (offering.semester === semester && seen.indexOf(offering.courseCode) === -1)
        {
            let course = getAcademicCourse(offering.courseCode);
            if (course) { courses.push(course); seen.push(course.code); }
        }
    }
    return courses;
}
