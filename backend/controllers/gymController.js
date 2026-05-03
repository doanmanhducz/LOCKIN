import { asyncHandler } from '../middleware/asyncHandler.js';
import { createGymSession, deleteGymSession, getGymSession, getGymSummary, listGymSessions, updateGymSession } from '../models/repositories.js';
import { gymSchema } from '../models/schemas.js';

export const getGymSessions = asyncHandler(async (req, res) => {
  res.json({ success: true, data: listGymSessions() });
});

export const getGymSessionById = asyncHandler(async (req, res) => {
  const session = getGymSession(Number(req.params.id));
  if (!session) {
    return res.status(404).json({ success: false, message: 'Gym session not found' });
  }
  res.json({ success: true, data: session });
});

export const getGymSessionsSummary = asyncHandler(async (req, res) => {
  res.json({ success: true, data: getGymSummary() });
});

export const createGymEntry = asyncHandler(async (req, res) => {
  const parsed = gymSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }
  const session = createGymSession(parsed.data);
  res.status(201).json({ success: true, data: session, message: 'Gym session logged successfully' });
});

export const updateGymEntry = asyncHandler(async (req, res) => {
  const parsed = gymSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }
  const session = updateGymSession(Number(req.params.id), parsed.data);
  if (!session) {
    return res.status(404).json({ success: false, message: 'Gym session not found' });
  }
  res.json({ success: true, data: session, message: 'Gym session updated successfully' });
});

export const deleteGymEntry = asyncHandler(async (req, res) => {
  const removed = deleteGymSession(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ success: false, message: 'Gym session not found' });
  }
  res.json({ success: true, message: 'Gym session deleted successfully' });
});
