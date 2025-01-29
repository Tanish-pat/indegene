import express from 'express';
import * as urlController from '../controllers/urlController.js';
import { isAuthenticated, isClerk } from '../middleware/isAuthenticated.js';

const router = express.Router();

// URL routes
router.route('/createUrl').post(isAuthenticated, isClerk, urlController.createUrl);
router.route('/getZones').get(isAuthenticated, isClerk, urlController.getZones);
router.route('/addZone').post(isAuthenticated, isClerk, urlController.addZone);
router.route('/getUrlsFromZone').get(isAuthenticated, isClerk, urlController.getUrlsFromZone);

export default router;
