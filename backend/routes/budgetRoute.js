import express from 'express';
import authUser from '../middlewares/authUser.js';
import {getBudgets, createOrUpdateBudget, updateBudget, deleteBudget} from '../controllers/budgetController.js';

const budgetRouter = express.Router();

budgetRouter.get('/', authUser, getBudgets);
budgetRouter.post('/', authUser, createOrUpdateBudget);
budgetRouter.put('/:id', authUser, updateBudget);
budgetRouter.delete('/:id', authUser, deleteBudget);

export default budgetRouter;


