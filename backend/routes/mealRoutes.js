import { Router } from 'express';
import { createMealEntry, deleteMealEntry, getMealById, getMeals, getMealsSummary, updateMealEntry } from '../controllers/mealController.js';

const router = Router();

router.get('/', getMeals);
router.get('/summary', getMealsSummary);
router.post('/', createMealEntry);
router.get('/:id', getMealById);
router.put('/:id', updateMealEntry);
router.delete('/:id', deleteMealEntry);

export default router;
