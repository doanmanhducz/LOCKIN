# LOCKIN – Coding & Design Rules

## 1. Coding Style
- Use ES6+ syntax for JavaScript / React
- Modular code: separate components, utils, API handlers
- Comment code clearly in English
- Keep functions < 50 lines when possible
- Consistent naming convention:
  - Components: PascalCase (BlogCard, TodoList)
  - Functions: camelCase (createTodo, fetchBlogs)
  - Variables: camelCase (userName, caloriesBurned)
  - API endpoints: kebab-case (/api/todos, /api/meals)
- Follow DRY principle (Don’t Repeat Yourself)

## 2. Frontend Rules
- React + TailwindCSS (or Material UI)
- Dark theme: primary background #1F1F1F, accent #1ABC9C, text #FFFFFF
- Responsive design for desktop + mobile
- Reusable components for buttons, forms, cards
- State management: Redux or Context API
- Connect all components to backend API

## 3. Backend Rules
- Node.js + Express (or FastAPI for Python)
- RESTful API endpoints for all features
- CRUD operations for all entities
- Input validation and error handling
- Use modular controllers/routes structure
- Database: SQLite or PostgreSQL
- Include mock DB seed for local dev

## 4. Project Structure
LOCKIN/
├─ frontend/
│ ├─ src/components/
│ ├─ src/pages/
│ ├─ src/utils/
├─ backend/
│ ├─ controllers/
│ ├─ routes/
│ ├─ models/
├─ prompt.md
├─ rule.md
├─ todolist.md


## 5. UX/UI Rules
- Easy-to-read fonts, spacing, and hover effects
- Smooth navigation and transitions
- Dark theme consistency across all modules
- Charts for stats (weekly/monthly) using Chart.js or Recharts
- Pomodoro timer visible and intuitive

## 6. Dev Practices
- Test each module independently
- Commit changes per module
- Always test API + frontend integration before moving to next module
- Use mock data first before real DB