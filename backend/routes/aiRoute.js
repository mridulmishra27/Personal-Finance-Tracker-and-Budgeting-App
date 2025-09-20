// routes/aiRoute.js

import express from 'express';
import { handleChat } from '../controllers/aiController.js';
import authUser from '../middlewares/authUser.js';

const aiRouter = express.Router();

// This route will handle all chat interactions
aiRouter.post('/chat', authUser, handleChat);

export default aiRouter;