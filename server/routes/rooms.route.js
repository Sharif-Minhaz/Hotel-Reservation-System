import express from "express";
import { verifyAdmin } from "./../utils/verifyToken.js";
import {
	createRoomPostController,
	roomDeleteController,
	roomGetAllController,
	roomGetController,
	roomPutController,
} from "../controllers/rooms.controller.js";
const router = express.Router();

router.get("/", roomGetAllController);
router.get("/:id", roomGetController);
router.post("/:hotelId", verifyAdmin, createRoomPostController);
router.put("/:id", verifyAdmin, roomPutController);
router.delete("/:id/:hotelId", verifyAdmin, roomDeleteController);

export default router;
