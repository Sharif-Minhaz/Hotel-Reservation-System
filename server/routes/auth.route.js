import express from "express";
import { loginPostController, registerPostController } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", registerPostController);
router.post("/login", loginPostController);

export default router;
