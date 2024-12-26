import express from 'express';
import { getAllUsers } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, getAllUsers);

export default router;