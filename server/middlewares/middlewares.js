import express from "express";
import cors from "cors";

const middlewares = [express.json(), express.urlencoded({ extended: true }), cors()];

export default (app) => {
	app.use(middlewares);
};
