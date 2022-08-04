import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const middlewares = [
	express.json(),
	express.urlencoded({ extended: true }),
	cors(),
	cookieParser(),
];

export default (app) => {
	app.use(middlewares);
};
