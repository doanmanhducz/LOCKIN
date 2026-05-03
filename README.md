# LOCKIN

LOCKIN is a personal productivity dashboard that combines planning, focus tracking, journaling/blogging, meal-gym logging, and portfolio information in one place.

## Features

- Portfolio profile and experience overview
- Blog posts for daily reflection and progress notes
- Todo management with priority and status
- Meal tracking with calories and notes
- Gym session tracking
- Pomodoro sessions and settings

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: SQLite (better-sqlite3)

## Project Structure

```text
LOCKIN/
	frontend/   # React app (port 3000)
	backend/    # Express API (port 5000)
	package.json
```

## Getting Started

### 1. Install dependencies

From the project root:

```bash
npm install
```

### 2. Run development servers

```bash
npm run dev
```

This starts:

- Frontend at `http://localhost:3000`
- Backend at `http://localhost:5000`

### 3. Seed sample data (optional)

```bash
npm run seed
```

Note: The backend also initializes and seeds baseline data at startup when needed.

## Root Scripts

- `npm run dev`: Run frontend and backend together
- `npm run dev:frontend`: Run only frontend
- `npm run dev:backend`: Run only backend
- `npm run seed`: Seed backend data

## API Health Check

```text
GET /api/health
```

Expected response:

```json
{
	"success": true,
	"message": "LOCKIN backend is running"
}
```

## Docker (development)

These Docker artifacts let you run the LOCKIN development environment without installing Node locally. The compose setup mounts your local source so changes appear immediately in the containers (hot-reload).

Build and start the dev environment:

```bash
docker compose build
docker compose up
```

Notes:
- Backend: exposed at `http://localhost:5000` (runs `npm run dev` inside the container).
- Frontend: Vite dev server exposed at `http://localhost:3000` (runs `npm run dev` inside the container).
- The frontend's Vite proxy can be configured with `VITE_BACKEND_URL`; the compose file sets it to `http://host.docker.internal:5000` so the frontend dev server inside the container forwards `/api` requests to the host Docker engine where the backend service is reachable.

Stopping and removing containers:

```bash
docker compose down
```

Production build (optional):

```bash
# Build frontend production image (nginx) and run it
docker compose build frontend
docker run -p 8080:80 --rm frontend_prod_image_name
```

