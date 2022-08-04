import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const registerPostController = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const salt = 10;
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		const createdUser = await newUser.save();
		res.status(201).json(createdUser);
	} catch (err) {
		next(err);
	}
};

export const loginPostController = async (req, res, next) => {
	const { username } = req.body;
	try {
		const user = await User.findOne({
			username,
		});

		if (!user) return next(createError(404, "Invalid username or password"));

		const match = await bcrypt.compare(req.body.password, user.password);

		if (!match) return next(createError(404, "Invalid username or password"));

		const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
		const { isAdmin, password, ...otherDetails } = user._doc;

		res.cookie("access_token", token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		})
			.status(200)
			.json(otherDetails);
	} catch (err) {
		next(err);
	}
};
