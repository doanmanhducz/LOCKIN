import { db } from '../config/database.js';

const json = {
  parse: (value) => JSON.parse(value),
  stringify: (value) => JSON.stringify(value),
};

const now = () => new Date().toISOString();

function mapPortfolio(row) {
  return {
    ...row,
    skills: json.parse(row.skills),
    experience: json.parse(row.experience),
    projects: json.parse(row.projects),
    publications: json.parse(row.publications),
  };
}

function mapBlog(row) {
  return {
    ...row,
    tags: json.parse(row.tags),
  };
}

function mapTodo(row) {
  return row;
}

function mapMeal(row) {
  return row;
}

function mapGym(row) {
  return row;
}

function mapPomodoroSettings(row) {
  return row;
}

function mapPomodoroSession(row) {
  return row;
}

export function getPortfolio() {
  const row = db.prepare('SELECT * FROM portfolio WHERE id = 1').get();
  return row ? mapPortfolio(row) : null;
}

export function upsertPortfolio(payload) {
  const existing = getPortfolio();
  const updatedAt = now();
  if (existing) {
    db.prepare(`
      UPDATE portfolio
      SET name = @name,
          objective = @objective,
          bio = @bio,
          education = @education,
          skills = @skills,
          experience = @experience,
          projects = @projects,
          publications = @publications,
          github = @github,
          linkedin = @linkedin,
          email = @email,
          updatedAt = @updatedAt
      WHERE id = 1
    `).run({
      ...payload,
      skills: json.stringify(payload.skills),
      experience: json.stringify(payload.experience),
      projects: json.stringify(payload.projects),
      publications: json.stringify(payload.publications),
      updatedAt,
    });
  } else {
    db.prepare(`
      INSERT INTO portfolio (id, name, objective, bio, education, skills, experience, projects, publications, github, linkedin, email, updatedAt)
      VALUES (1, @name, @objective, @bio, @education, @skills, @experience, @projects, @publications, @github, @linkedin, @email, @updatedAt)
    `).run({
      ...payload,
      skills: json.stringify(payload.skills),
      experience: json.stringify(payload.experience),
      projects: json.stringify(payload.projects),
      publications: json.stringify(payload.publications),
      updatedAt,
    });
  }
  return getPortfolio();
}

export function listBlogs({ search = '', tag = '' } = {}) {
  const rows = db.prepare('SELECT * FROM blogs ORDER BY datetime(createdAt) DESC').all();
  return rows
    .map(mapBlog)
    .filter((blog) => {
      const haystack = `${blog.title} ${blog.content}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search.toLowerCase());
      const matchesTag = !tag || blog.tags.includes(tag);
      return matchesSearch && matchesTag;
    });
}

export function getBlog(id) {
  const row = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
  return row ? mapBlog(row) : null;
}

export function createBlog(payload) {
  const createdAt = now();
  const result = db.prepare(`
    INSERT INTO blogs (title, content, tags, createdAt, updatedAt)
    VALUES (@title, @content, @tags, @createdAt, @updatedAt)
  `).run({
    ...payload,
    tags: json.stringify(payload.tags),
    createdAt,
    updatedAt: createdAt,
  });
  return getBlog(result.lastInsertRowid);
}

export function updateBlog(id, payload) {
  const existing = getBlog(id);
  if (!existing) return null;
  db.prepare(`
    UPDATE blogs
    SET title = @title,
        content = @content,
        tags = @tags,
        updatedAt = @updatedAt
    WHERE id = @id
  `).run({
    id,
    ...payload,
    tags: json.stringify(payload.tags),
    updatedAt: now(),
  });
  return getBlog(id);
}

export function deleteBlog(id) {
  const result = db.prepare('DELETE FROM blogs WHERE id = ?').run(id);
  return result.changes > 0;
}

export function listTodos({ status = '', search = '' } = {}) {
  const rows = db.prepare('SELECT * FROM todos ORDER BY datetime(dueDate) ASC').all();
  return rows.filter((todo) => {
    const haystack = `${todo.title} ${todo.description}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search.toLowerCase());
    const matchesStatus = !status || todo.status === status;
    return matchesSearch && matchesStatus;
  });
}

export function getTodo(id) {
  return db.prepare('SELECT * FROM todos WHERE id = ?').get(id) || null;
}

export function createTodo(payload) {
  const createdAt = now();
  const result = db.prepare(`
    INSERT INTO todos (title, description, dueDate, status, priority, createdAt, updatedAt)
    VALUES (@title, @description, @dueDate, @status, @priority, @createdAt, @updatedAt)
  `).run({ ...payload, createdAt, updatedAt: createdAt });
  return getTodo(result.lastInsertRowid);
}

export function updateTodo(id, payload) {
  const existing = getTodo(id);
  if (!existing) return null;
  db.prepare(`
    UPDATE todos
    SET title = @title,
        description = @description,
        dueDate = @dueDate,
        status = @status,
        priority = @priority,
        updatedAt = @updatedAt
    WHERE id = @id
  `).run({ id, ...payload, updatedAt: now() });
  return getTodo(id);
}

export function deleteTodo(id) {
  return db.prepare('DELETE FROM todos WHERE id = ?').run(id).changes > 0;
}

export function getTodoStats() {
  const total = db.prepare('SELECT COUNT(*) AS count FROM todos').get().count;
  const done = db.prepare("SELECT COUNT(*) AS count FROM todos WHERE status = 'done'").get().count;
  const pending = db.prepare("SELECT COUNT(*) AS count FROM todos WHERE status != 'done'").get().count;
  const overdue = db.prepare("SELECT COUNT(*) AS count FROM todos WHERE status != 'done' AND date(dueDate) < date('now')").get().count;
  return { total, done, pending, overdue };
}

export function listMeals() {
  return db.prepare('SELECT * FROM meals ORDER BY datetime(consumedAt) DESC').all().map(mapMeal);
}

export function getMeal(id) {
  return db.prepare('SELECT * FROM meals WHERE id = ?').get(id) || null;
}

export function createMeal(payload) {
  const createdAt = now();
  const result = db.prepare(`
    INSERT INTO meals (name, calories, consumedAt, notes, createdAt, updatedAt)
    VALUES (@name, @calories, @consumedAt, @notes, @createdAt, @updatedAt)
  `).run({ ...payload, createdAt, updatedAt: createdAt });
  return getMeal(result.lastInsertRowid);
}

export function updateMeal(id, payload) {
  const existing = getMeal(id);
  if (!existing) return null;
  db.prepare(`
    UPDATE meals
    SET name = @name,
        calories = @calories,
        consumedAt = @consumedAt,
        notes = @notes,
        updatedAt = @updatedAt
    WHERE id = @id
  `).run({ id, ...payload, updatedAt: now() });
  return getMeal(id);
}

export function deleteMeal(id) {
  return db.prepare('DELETE FROM meals WHERE id = ?').run(id).changes > 0;
}

export function getMealSummary() {
  const totalCalories = db.prepare('SELECT COALESCE(SUM(calories), 0) AS total FROM meals').get().total;
  return { totalCalories, entries: db.prepare('SELECT COUNT(*) AS count FROM meals').get().count };
}

export function listGymSessions() {
  return db.prepare('SELECT * FROM gym_sessions ORDER BY datetime(performedAt) DESC').all().map(mapGym);
}

export function getGymSession(id) {
  return db.prepare('SELECT * FROM gym_sessions WHERE id = ?').get(id) || null;
}

export function createGymSession(payload) {
  const createdAt = now();
  const result = db.prepare(`
    INSERT INTO gym_sessions (exerciseType, sets, reps, caloriesBurned, performedAt, notes, createdAt, updatedAt)
    VALUES (@exerciseType, @sets, @reps, @caloriesBurned, @performedAt, @notes, @createdAt, @updatedAt)
  `).run({ ...payload, createdAt, updatedAt: createdAt });
  return getGymSession(result.lastInsertRowid);
}

export function updateGymSession(id, payload) {
  const existing = getGymSession(id);
  if (!existing) return null;
  db.prepare(`
    UPDATE gym_sessions
    SET exerciseType = @exerciseType,
        sets = @sets,
        reps = @reps,
        caloriesBurned = @caloriesBurned,
        performedAt = @performedAt,
        notes = @notes,
        updatedAt = @updatedAt
    WHERE id = @id
  `).run({ id, ...payload, updatedAt: now() });
  return getGymSession(id);
}

export function deleteGymSession(id) {
  return db.prepare('DELETE FROM gym_sessions WHERE id = ?').run(id).changes > 0;
}

export function getGymSummary() {
  const totalCaloriesBurned = db.prepare('SELECT COALESCE(SUM(caloriesBurned), 0) AS total FROM gym_sessions').get().total;
  return { totalCaloriesBurned, entries: db.prepare('SELECT COUNT(*) AS count FROM gym_sessions').get().count };
}

export function getPomodoroSettings() {
  const row = db.prepare('SELECT * FROM pomodoro_settings WHERE id = 1').get();
  return row ? mapPomodoroSettings(row) : null;
}

export function upsertPomodoroSettings(payload) {
  const updatedAt = now();
  if (getPomodoroSettings()) {
    db.prepare(`
      UPDATE pomodoro_settings
      SET workMinutes = @workMinutes,
          shortBreakMinutes = @shortBreakMinutes,
          longBreakMinutes = @longBreakMinutes,
          longBreakInterval = @longBreakInterval,
          updatedAt = @updatedAt
      WHERE id = 1
    `).run({ ...payload, updatedAt });
  } else {
    db.prepare(`
      INSERT INTO pomodoro_settings (id, workMinutes, shortBreakMinutes, longBreakMinutes, longBreakInterval, sessionsCompleted, updatedAt)
      VALUES (1, @workMinutes, @shortBreakMinutes, @longBreakMinutes, @longBreakInterval, 0, @updatedAt)
    `).run({ ...payload, updatedAt });
  }
  return getPomodoroSettings();
}

export function listPomodoroSessions() {
  return db.prepare('SELECT * FROM pomodoro_sessions ORDER BY datetime(createdAt) DESC').all().map(mapPomodoroSession);
}

export function createPomodoroSession(payload) {
  const createdAt = now();
  const result = db.prepare(`
    INSERT INTO pomodoro_sessions (sessionType, durationMinutes, completed, startedAt, endedAt, notes, createdAt)
    VALUES (@sessionType, @durationMinutes, @completed, @startedAt, @endedAt, @notes, @createdAt)
  `).run({ ...payload, createdAt, completed: payload.completed ? 1 : 0 });

  if (payload.completed) {
    db.prepare(`
      UPDATE pomodoro_settings
      SET sessionsCompleted = sessionsCompleted + 1,
          updatedAt = @updatedAt
      WHERE id = 1
    `).run({ updatedAt: createdAt });
  }

  return db.prepare('SELECT * FROM pomodoro_sessions WHERE id = ?').get(result.lastInsertRowid);
}

export function deletePomodoroSession(id) {
  return db.prepare('DELETE FROM pomodoro_sessions WHERE id = ?').run(id).changes > 0;
}

export function getPomodoroSummary() {
  const sessionsCompleted = db.prepare('SELECT COUNT(*) AS count FROM pomodoro_sessions WHERE completed = 1').get().count;
  const totalSessions = db.prepare('SELECT COUNT(*) AS count FROM pomodoro_sessions').get().count;
  const focusMinutes = db.prepare("SELECT COALESCE(SUM(durationMinutes), 0) AS total FROM pomodoro_sessions WHERE sessionType = 'focus'").get().total;
  return {
    totalSessions,
    sessionsCompleted,
    focusMinutes,
    settings: getPomodoroSettings(),
  };
}
