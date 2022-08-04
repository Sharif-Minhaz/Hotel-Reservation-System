import express from "express";
import {
	userDeleteController,
	userGetAllController,
	userGetController,
	userPutController,
} from "../controllers/users.controller.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/",verifyAdmin, userGetAllController);
router.get("/:id",verifyUser, userGetController);
router.put("/:id", verifyUser, userPutController);
router.delete("/:id", verifyUser, userDeleteController);

export default router;
