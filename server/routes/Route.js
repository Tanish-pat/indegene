import express from 'express';
import userRoutes from './routeUser.js';
import urlRoutes from './routeUrl.js';
import messageRoutes from './routeMessage.js';
import conversationRoutes from './routeConversation.js';
import docRoutes from './routeDoc.js';

const router = express.Router();

// Use individual route files
router.use('/user', userRoutes);
router.use('/url', urlRoutes);
router.use('/messages', messageRoutes);
router.use('/conversations', conversationRoutes);
router.use('/docs', docRoutes);

export default router;
