import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
	hotelGetController,
	hotelGetAllController,
	hotelPostController,
	hotelPutController,
	hotelDeleteController,
} from "../controllers/hotels.controller.js";
const router = express.Router();

router.get("/", hotelGetAllController);
router.get("/:id", hotelGetController);
router.post("/", verifyAdmin, hotelPostController);
router.put("/:id", verifyAdmin, hotelPutController);
router.delete("/:id", verifyAdmin, hotelDeleteController);

export default router;
