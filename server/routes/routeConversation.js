import express from 'express';
import * as conversationController from '../controllers/conversationController.js';
import { isAuthenticated, isUser } from '../middleware/isAuthenticated.js';

const router = express.Router();

// Conversation routes
router.route('/').post(isAuthenticated, isUser, conversationController.createConversation);
router.route('/getConversations').get(isAuthenticated, isUser, conversationController.getUserConversations);
router.route('/deleteConversation').post(isAuthenticated, isUser, conversationController.deleteConversation);

export default router;
