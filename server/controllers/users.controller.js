import User from "../models/User.model.js";

//UPDATE
export const userPutController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
		res.status(200).json(updatedUser);
	} catch (err) {
		next(err);
	}
};

//DELETE
export const userDeleteController = async (req, res, next) => {
	const { id } = req.params;
	try {
		await User.findByIdAndDelete(id);
		res.status(200).json("User has been deleted");
	} catch (err) {
		next(err);
	}
};

//GET
export const userGetController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const User = await User.findById(id);
		res.status(200).json(User);
	} catch (err) {
		next(err);
	}
};

//GET ALL
export const userGetAllController = async (req, res, next) => {
	try {
		const Users = await User.find();
		res.status(200).json(Users);
	} catch (err) {
		next(err);
	}
};
