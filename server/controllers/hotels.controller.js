import Hotel from "../models/Hotel.model.js";
import Room from "../models/Room.model.js";

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
	const { min, max, ...others } = req.query;
	try {
		const hotels = await Hotel.find({
			...others,
			cheapestPrice: {
				$gt: Number(min) - 1,
				$lt: Number(max) + 1,
			},
		}).limit(req.query.limit);
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};

export const getByCityController = async (req, res, next) => {
	const cities = req.query.cities.split(",");
	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city });
			})
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};

export const getByTypeController = async (req, res, next) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: "hotel" });
		const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
		const resortCount = await Hotel.countDocuments({ type: "resort" });
		const villaCount = await Hotel.countDocuments({ type: "villa" });
		const cabinCount = await Hotel.countDocuments({ type: "cabin" });

		res.status(200).json([
			{ type: "hotel", count: hotelCount },
			{ type: "apartment", count: apartmentCount },
			{ type: "resort", count: resortCount },
			{ type: "villa", count: villaCount },
			{ type: "cabin", count: cabinCount },
		]);
	} catch (err) {
		next(err);
	}
};

export const getRoomGetController = async (req, res, next) => {
	const { hotelId } = req.params;
	try {
		const hotel = await Hotel.findById(hotelId);
		const list = await Promise.all(
			hotel.rooms.map((room) => {
				return Room.findById(room);
			})
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};
