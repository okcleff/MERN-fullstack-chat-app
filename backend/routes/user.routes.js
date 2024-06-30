import express from 'express';
import checkAuth from '../middlewares/checkAuth.middleware.js';
import { getUsersForSidebar } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', checkAuth, getUsersForSidebar);

export default router;
