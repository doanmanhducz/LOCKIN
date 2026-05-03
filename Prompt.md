PROJECT: LOCKIN – Personal Growth Tracker Website

OBJECTIVE:
- Develop a full-stack personal growth tracking website named LOCKIN.
- Purpose: Track daily/weekly/monthly/yearly personal growth activities, including blogging, todo tracking, meal & gym tracking, and Pomodoro sessions.
- Stack: 
    - Frontend: React.js (with TailwindCSS or Material UI for dark theme)
    - Backend: Node.js + Express (or Python + FastAPI)
    - Database: SQLite or PostgreSQL for local dev
    - Optional: Redux or Context API for state management in frontend

THEME & DESIGN:
- Dark theme, visually easy on eyes, minimalist layout
- Responsive design for desktop and mobile
- Use consistent color palette: e.g., dark gray #1F1F1F, accent teal #1ABC9C, text white #FFFFFF
- All components must have proper styling, spacing, and hover effects
- Prioritize usability and smooth UX

RULES (follow coding best practices):
1. Use ES6+ syntax for JavaScript
2. Separate components for each feature (Blog, Todo, Meal/Gym, Pomodoro)
3. Proper folder structure:
    - /frontend/src/components/
    - /frontend/src/pages/
    - /frontend/src/utils/
    - /backend/routes/
    - /backend/controllers/
    - /backend/models/
4. Comment code extensively
5. All API endpoints should have error handling
6. Validate user input on frontend and backend
7. Use modular and reusable components

USER DATA (mock / initial):
- Name: Doan Manh Duc
- Skills & Bio: see attached CV – use to generate Portfolio section with personal info, education, skills, experience, projects, publications, GitHub/LinkedIn links
- Todo Items: title, description, date, status (todo/in progress/done)
- Meal tracking: name, calories, date/time
- Gym tracking: exercise type, sets, reps, calories burned
- Pomodoro: 25-min focus sessions with 5-min short break, 15–30 min long break

FUNCTIONAL MODULES:

1️⃣ Portfolio & Blog
- Header: Portfolio info generated from CV (Name, Objective, Education, Skills, Experience, Projects, Publications, Links)
- Blog section: list of personal posts with title, content, date, tags
- CRUD operations for blog posts
- Rich text editor (optional: use Draft.js or Quill)
- Blog should be filterable by tag and searchable

2️⃣ Todo List
- Calendar view: daily, weekly, monthly, yearly
- Create/Edit/Delete todo items
- Mark as done/in progress
- Store in DB and sync with frontend
- Provide summary stats (number of tasks done, pending, overdue)

3️⃣ Meal & Gym Tracking
- Meal tracker: log meals with calories
- Gym tracker: log exercise, sets/reps, calories burned
- Calculate total calories in/out
- Display graphs for weekly/monthly activity

4️⃣ Pomodoro Timer
- Timer with 25/5/15-30 min intervals
- Start/Pause/Reset functions
- Show session count
- Optional: Notify user when session ends

API REQUIREMENTS:
- RESTful endpoints for all features
- Example: /api/todos, /api/blogs, /api/meals, /api/gym, /api/pomodoro
- Include CRUD + validation + error handling

LOCAL DEV SETUP:
1. Backend: run server locally on port 5000
2. Frontend: run React dev server on port 3000
3. Database: SQLite/PostgreSQL local
4. Make sure all modules work locally before deployment

CODING GUIDELINES FOR CODEX:
1. Focus on one feature/module at a time
2. Ask for clarification if requirement is unclear
3. Always reference rule.md and todolist.md before generating code
4. Output code in structured, copy-pasteable format
5. Include instructions on how to run/test the module
6. Write comments in English
7. Use reusable components/functions whenever possible
8. Keep frontend/backend separate but connected through REST API
9. For UI components, generate TailwindCSS classes or Material UI components

PROMPT USAGE:
- Always prepend: "You are a senior full-stack developer. Generate high-quality, modular, dark-themed React + Node/Express/FastAPI code for LOCKIN based on rules and todo list."
- Specify module to code: e.g., "Generate the Todo List backend API"
- Reference prompt.md + rule.md for style
- Ask Codex to generate frontend + backend + mock DB seed for local dev
- After module done, test locally, then move to next module

NOTE:
- Treat CV_DOANMANHDUC_latest.pdf as source to generate Portfolio info (header)
- Focus on building working MVP first, then enhance styling/animations