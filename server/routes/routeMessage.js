import express from 'express';
import * as messageController from '../controllers/messageController.js';
import { isAuthenticated, isUser } from '../middleware/isAuthenticated.js';

const router = express.Router();

// Message routes
router.route('/createMessage').post(isAuthenticated, isUser, messageController.createMessage);
router.route('/getMessages').post(isAuthenticated, isUser, messageController.getMessages);

export default router;
