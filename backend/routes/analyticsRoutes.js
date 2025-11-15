import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUrlAnalytics, getUserAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.use(protect); // All routes are protected

router.get('/user', getUserAnalytics);
router.get('/:shortCode', getUrlAnalytics);

export default router;

