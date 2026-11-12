// Sample accounts for the four roles.
let demoAccounts = [
    { role: "student", email: "student@studybuddy.example", password: "StudyBuddy1", page: "Student/StudentDashboard.html" },
    { role: "admin", email: "admin@studybuddy.example", password: "StudyBuddy1", page: "Admin/AdminDashboard.html" },
    { role: "advisor", email: "advisor@studybuddy.example", password: "StudyBuddy1", page: "Advisor/AdvisorDashboard.html" },
    { role: "coordinator", email: "coordinator@studybuddy.example", password: "StudyBuddy1", page: "Coordinator/CoordinatorDashboard.html" }
];

// This array exists only while Login.html stays open. Nothing is saved to storage.
let registeredStudents = [];
let programs = ["CSE", "EEE", "BBA"];
let semesters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let roles = ["student", "admin", "advisor", "coordinator"];
