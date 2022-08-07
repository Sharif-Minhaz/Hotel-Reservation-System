import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
	hotelGetController,
	hotelGetAllController,
	hotelPostController,
	hotelPutController,
	hotelDeleteController,
	getByCityController,
	getByTypeController,
	getRoomGetController,
} from "../controllers/hotels.controller.js";
const router = express.Router();

router.get("/", hotelGetAllController);
router.get("/find/:id", hotelGetController);

router.get("/getByCity", getByCityController);
router.get("/getByType", getByTypeController);
router.get("/room/:hotelId", getRoomGetController);

router.post("/", verifyAdmin, hotelPostController);

router.put("/:id", verifyAdmin, hotelPutController);

router.delete("/:id", verifyAdmin, hotelDeleteController);

export default router;
