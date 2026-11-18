# StudyBuddy

StudyBuddy is a frontend demo for student academic planning and course recommendations. It was developed for Web Technologies, Fall 2026–27, Group 9.

## Run the demo

Open `index.html` in a browser with JavaScript enabled. Choose **Student Login** and use the sample account below, or use **Student Registration** to create a temporary demo account with fictional details.

- Email — `student@studybuddy.example`
- Password — `StudyBuddy1`

After registering, use **Go to login** to keep the temporary account available. Refreshing or leaving the login page clears that account.

## Implemented on `student-module`

- Homepage showing all four planned roles.
- Student login with sample or temporarily registered credentials, and student registration with client-side form validation.
- Student Dashboard with sample academic progress, a credit-weighted GPA calculator, a semester planner with a credit limit, and course recommendations based on completed courses and sample prerequisites.

## Pending modules

Administrator, Faculty Advisor, and Academic Coordinator were planned but are unimplemented on this branch. Their role labels remain visible, and their login and dashboard navigation are disabled. Registration is available for students only.

## Project limitations

- The demo uses HTML, CSS, and JavaScript. It has no backend, database, server-side authentication, or access control. The Student Dashboard can be opened directly.
- Dashboard data is fictional and shared across demo accounts. Registration details are held in memory on the login page, and dashboard inputs and plans are temporary.
- Course recommendations use fixed rules and sample data. They do not reflect an official catalog or institutional advising.

## AI assistance

OpenAI Codex assisted with reviewing the existing student frontend, restricting navigation and registration to the implemented module, and updating this README. The course recommendations use JavaScript prerequisite rules.
