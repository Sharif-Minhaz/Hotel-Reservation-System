import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
// middlewares
import setMiddlewares from "./middlewares/middlewares.js";
// routes
import setRoutes from "./routes/routes.js";

dotenv.config();
// set middlewares and routes
setMiddlewares(app);
setRoutes(app);

// handle not found route
app.use((req, res, next) => {
	res.status(404).json("Page not found");
});

// handle server error
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong";
	res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
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
