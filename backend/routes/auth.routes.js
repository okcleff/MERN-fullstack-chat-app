import express from "express";
import {
  signUpUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", signUpUser);

router.get("/login", loginUser);

router.get("/logout", logoutUser);

export default router;
