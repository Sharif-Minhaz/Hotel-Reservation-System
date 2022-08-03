import User from "../models/User.model.js";
import bcrypt from "bcrypt";

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
		if (!user) throw new Error("Invalid username or password");
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) throw new Error("Invalid username or password");
		const { isAdmin, password, ...otherDetails } = user._doc;
		res.status(200).json(otherDetails);
	} catch (err) {
		next(err);
	}
};
