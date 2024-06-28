import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import checkAuth from '../middlewares/checkAuth.middleware.js';

const router = express.Router();

// userId
router.get('/:id', checkAuth, getMessages);
// userId
router.post('/send/:id', checkAuth, sendMessage);

export default router;
