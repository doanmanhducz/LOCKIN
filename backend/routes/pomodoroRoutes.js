import { Router } from 'express';
import { createPomodoroEntry, deletePomodoroEntry, getPomodoroConfig, getPomodoroSessions, getPomodoroStats, updatePomodoroConfig } from '../controllers/pomodoroController.js';

const router = Router();

router.get('/', getPomodoroStats);
router.get('/settings', getPomodoroConfig);
router.put('/settings', updatePomodoroConfig);
router.get('/sessions', getPomodoroSessions);
router.post('/sessions', createPomodoroEntry);
router.delete('/sessions/:id', deletePomodoroEntry);

export default router;
