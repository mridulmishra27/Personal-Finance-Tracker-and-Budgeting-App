import express from 'express';
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js';
import { getExpenseAnalytics } from '../controllers/expenseAnalyticsController.js';
import authUser from '../middlewares/authUser.js';

const expenseRouter = express.Router();

// Analytics route
expenseRouter.get('/analytics', authUser, getExpenseAnalytics);

// CRUD routes
expenseRouter.post('/', authUser, createExpense);
expenseRouter.get('/', authUser, getExpenses);
expenseRouter.put('/:id', authUser, updateExpense);
expenseRouter.delete('/:id', authUser, deleteExpense);

export default expenseRouter;

