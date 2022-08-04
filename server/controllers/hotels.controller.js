import Hotel from "../models/Hotel.model.js";

// CREATE
export const hotelPostController = async (req, res, next) => {
	const newHotel = new Hotel(req.body);
	try {
		const createdHotel = await newHotel.save();
		res.status(201).json(createdHotel);
	} catch (err) {
		next(err);
	}
};

//UPDATE
export const hotelPutController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
		res.status(200).json(updatedHotel);
	} catch (err) {
		next(err);
	}
};

//DELETE
export const hotelDeleteController = async (req, res, next) => {
	const { id } = req.params;
	try {
		await Hotel.findByIdAndDelete(id);
		res.status(200).json("Hotel has been deleted");
	} catch (err) {
		next(err);
	}
};

//GET
export const hotelGetController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const hotel = await Hotel.findById(id);
		res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
};

//GET ALL
export const hotelGetAllController = async (req, res, next) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};
