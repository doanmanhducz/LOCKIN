import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import blogRoutes from './routes/blogRoutes.js';
import gymRoutes from './routes/gymRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
import pomodoroRoutes from './routes/pomodoroRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'LOCKIN backend is running' });
});

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/gym', gymRoutes);
app.use('/api/pomodoro', pomodoroRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
