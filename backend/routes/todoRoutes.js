import { Router } from 'express';
import { createTodoItem, deleteTodoItem, getTodoById, getTodoSummary, getTodos, updateTodoItem } from '../controllers/todoController.js';

const router = Router();

router.get('/', getTodos);
router.get('/summary', getTodoSummary);
router.post('/', createTodoItem);
router.get('/:id', getTodoById);
router.put('/:id', updateTodoItem);
router.delete('/:id', deleteTodoItem);

export default router;
