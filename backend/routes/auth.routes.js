import express from 'express';
import {
  signUpUser,
  loginUser,
  logoutUser,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUpUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

export default router;
