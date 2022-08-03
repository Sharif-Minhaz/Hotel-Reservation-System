import express from "express";
import {
    hotelGetController,
    hotelGetAllController,
	hotelPostController,
	hotelPutController,
	hotelDeleteController,
} from "../controllers/hotels.controller.js";
const router = express.Router();

router.get("/", hotelGetAllController);
router.get("/:id", hotelGetController );
router.post("/", hotelPostController);
router.put("/:id", hotelPutController);
router.delete("/:id", hotelDeleteController);

export default router;
