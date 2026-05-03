import { Router } from 'express';
import { createGymEntry, deleteGymEntry, getGymSessionById, getGymSessions, getGymSessionsSummary, updateGymEntry } from '../controllers/gymController.js';

const router = Router();

router.get('/', getGymSessions);
router.get('/summary', getGymSessionsSummary);
router.post('/', createGymEntry);
router.get('/:id', getGymSessionById);
router.put('/:id', updateGymEntry);
router.delete('/:id', deleteGymEntry);

export default router;
