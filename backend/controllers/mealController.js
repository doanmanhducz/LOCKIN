import { asyncHandler } from '../middleware/asyncHandler.js';
import { createMeal, deleteMeal, getMeal, getMealSummary, listMeals, updateMeal } from '../models/repositories.js';
import { mealSchema } from '../models/schemas.js';

export const getMeals = asyncHandler(async (req, res) => {
  res.json({ success: true, data: listMeals() });
});

export const getMealById = asyncHandler(async (req, res) => {
  const meal = getMeal(Number(req.params.id));
  if (!meal) {
    return res.status(404).json({ success: false, message: 'Meal not found' });
  }
  res.json({ success: true, data: meal });
});

export const getMealsSummary = asyncHandler(async (req, res) => {
  res.json({ success: true, data: getMealSummary() });
});

export const createMealEntry = asyncHandler(async (req, res) => {
  const parsed = mealSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }
  const meal = createMeal(parsed.data);
  res.status(201).json({ success: true, data: meal, message: 'Meal logged successfully' });
});

export const updateMealEntry = asyncHandler(async (req, res) => {
  const parsed = mealSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }
  const meal = updateMeal(Number(req.params.id), parsed.data);
  if (!meal) {
    return res.status(404).json({ success: false, message: 'Meal not found' });
  }
  res.json({ success: true, data: meal, message: 'Meal updated successfully' });
});

export const deleteMealEntry = asyncHandler(async (req, res) => {
  const removed = deleteMeal(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ success: false, message: 'Meal not found' });
  }
  res.json({ success: true, message: 'Meal deleted successfully' });
});
