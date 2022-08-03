import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
// routes
import setRoutes from "./routes/routes.js";
// middlewares
import setMiddlewares from "./middlewares/middlewares.js";

dotenv.config();
// set routes and middlewares
setRoutes(app);
setMiddlewares(app);

// handle not found route
app.use((req, res, next) => {
	res.status(404).json("Page not found");
});

// handle server error
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json("Internal server error");
});

const port = process.env.PORT || 8800;

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(port, () => {
			console.info(`Server running at http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});