import { asyncHandler } from '../middleware/asyncHandler.js';
import { createPomodoroSession, deletePomodoroSession, getPomodoroSettings, getPomodoroSummary, listPomodoroSessions, upsertPomodoroSettings } from '../models/repositories.js';
import { pomodoroSessionSchema, pomodoroSettingsSchema } from '../models/schemas.js';

export const getPomodoroConfig = asyncHandler(async (req, res) => {
  res.json({ success: true, data: getPomodoroSettings() });
});

export const updatePomodoroConfig = asyncHandler(async (req, res) => {
  const parsed = pomodoroSettingsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }
  const settings = upsertPomodoroSettings(parsed.data);
  res.json({ success: true, data: settings, message: 'Pomodoro settings updated successfully' });
});

export const getPomodoroSessions = asyncHandler(async (req, res) => {
  res.json({ success: true, data: listPomodoroSessions() });
});

export const getPomodoroStats = asyncHandler(async (req, res) => {
  res.json({ success: true, data: getPomodoroSummary() });
});

export const createPomodoroEntry = asyncHandler(async (req, res) => {
  const parsed = pomodoroSessionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }
  const session = createPomodoroSession(parsed.data);
  res.status(201).json({ success: true, data: session, message: 'Pomodoro session logged successfully' });
});

export const deletePomodoroEntry = asyncHandler(async (req, res) => {
  const removed = deletePomodoroSession(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ success: false, message: 'Pomodoro session not found' });
  }
  res.json({ success: true, message: 'Pomodoro session deleted successfully' });
});
