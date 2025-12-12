import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goalsController.js';

const goalsRouter = express.Router();

goalsRouter.get('/', authUser, getGoals);
goalsRouter.post('/', authUser, createGoal);
goalsRouter.put('/:id', authUser, updateGoal);
goalsRouter.delete('/:id', authUser, deleteGoal);

export default goalsRouter;



