import express from "express";
const router = express.Router();

router.get("/register", (req, res) => {
	res.send("This is register route");
});

export default router;
