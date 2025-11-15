import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createShortUrl,
  getUserUrls,
  getUrl,
  deleteUrl,
  getQRCode
} from '../controllers/urlController.js';
import { body } from 'express-validator';

const router = express.Router();

// Validation middleware
const urlValidation = [
  body('longUrl')
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('Please provide a valid URL'),
  body('customAlias')
    .optional()
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9-_]+$/)
    .withMessage('Custom alias must be 3-20 characters and contain only letters, numbers, hyphens, and underscores')
];

router.use(protect); // All routes are protected

router.post('/', urlValidation, createShortUrl);
router.get('/', getUserUrls);
router.get('/:id', getUrl);
router.delete('/:id', deleteUrl);
router.get('/:id/qr', getQRCode);

export default router;

