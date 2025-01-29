import express from 'express';
import * as docController from '../controllers/docController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

// Document routes
router.route('/add').post(isAuthenticated, docController.addDoc);
router.route('/rename/:id').patch(isAuthenticated, docController.renameDoc);
router.route('/delete/:id').delete(isAuthenticated, docController.deleteDoc);
router.route('/move/:id').patch(isAuthenticated, docController.moveDoc);
router.route('/fetch').get(isAuthenticated, docController.fetchDocs);

export default router;
