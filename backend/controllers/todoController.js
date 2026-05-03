import { asyncHandler } from '../middleware/asyncHandler.js';
import { createTodo, deleteTodo, getTodo, getTodoStats, listTodos, updateTodo } from '../models/repositories.js';
import { todoSchema } from '../models/schemas.js';

export const getTodos = asyncHandler(async (req, res) => {
  const todos = listTodos({ status: req.query.status || '', search: req.query.search || '' });
  res.json({ success: true, data: todos });
});

export const getTodoById = asyncHandler(async (req, res) => {
  const todo = getTodo(Number(req.params.id));
  if (!todo) {
    return res.status(404).json({ success: false, message: 'Todo item not found' });
  }
  res.json({ success: true, data: todo });
});

export const getTodoSummary = asyncHandler(async (req, res) => {
  res.json({ success: true, data: getTodoStats() });
});

export const createTodoItem = asyncHandler(async (req, res) => {
  const parsed = todoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }
  const todo = createTodo(parsed.data);
  res.status(201).json({ success: true, data: todo, message: 'Todo created successfully' });
});

export const updateTodoItem = asyncHandler(async (req, res) => {
  const parsed = todoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }
  const todo = updateTodo(Number(req.params.id), parsed.data);
  if (!todo) {
    return res.status(404).json({ success: false, message: 'Todo item not found' });
  }
  res.json({ success: true, data: todo, message: 'Todo updated successfully' });
});

export const deleteTodoItem = asyncHandler(async (req, res) => {
  const removed = deleteTodo(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ success: false, message: 'Todo item not found' });
  }
  res.json({ success: true, message: 'Todo deleted successfully' });
});
