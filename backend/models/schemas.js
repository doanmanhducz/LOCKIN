import { z } from 'zod';

const isoDateTime = z.string().min(1, 'Date and time are required');

export const portfolioSchema = z.object({
  name: z.string().min(1),
  objective: z.string().min(1),
  bio: z.string().min(1),
  education: z.string().min(1),
  skills: z.array(z.string().min(1)),
  experience: z.array(z.string().min(1)),
  projects: z.array(z.string().min(1)),
  publications: z.array(z.string().min(1)),
  github: z.string().url(),
  linkedin: z.string().url(),
  email: z.string().email(),
});

export const blogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  tags: z.array(z.string().min(1)).min(1, 'At least one tag is required'),
});

export const todoSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description is required'),
  dueDate: isoDateTime,
  status: z.enum(['todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export const mealSchema = z.object({
  name: z.string().min(2),
  calories: z.coerce.number().int().positive(),
  consumedAt: isoDateTime,
  notes: z.string().optional().default(''),
});

export const gymSchema = z.object({
  exerciseType: z.string().min(2),
  sets: z.coerce.number().int().positive(),
  reps: z.coerce.number().int().positive(),
  caloriesBurned: z.coerce.number().int().nonnegative(),
  performedAt: isoDateTime,
  notes: z.string().optional().default(''),
});

export const pomodoroSettingsSchema = z.object({
  workMinutes: z.coerce.number().int().min(1).max(180),
  shortBreakMinutes: z.coerce.number().int().min(1).max(60),
  longBreakMinutes: z.coerce.number().int().min(5).max(120),
  longBreakInterval: z.coerce.number().int().min(2).max(10),
});

export const pomodoroSessionSchema = z.object({
  sessionType: z.enum(['focus', 'short-break', 'long-break']),
  durationMinutes: z.coerce.number().int().min(1).max(240),
  completed: z.coerce.boolean(),
  startedAt: isoDateTime,
  endedAt: isoDateTime,
  notes: z.string().optional().default(''),
});
