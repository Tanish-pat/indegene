import express from 'express';
import * as userController from '../controllers/userController.js';
import { isAuthenticated, isAdmin } from '../middleware/isAuthenticated.js';

const router = express.Router();

// User routes
router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);
router.route('/getOtherUsers').get(isAuthenticated, isAdmin, userController.getOtherUsers);

export default router;
