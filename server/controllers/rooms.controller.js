import Room from "../models/Room.model.js";
import Hotel from "../models/Hotel.model.js";

//create room
export const createRoomPostController = async (req, res, next) => {
	const { hotelId } = req.params;
	const newRoom = new Room(req.body);
	try {
		const savedRoom = await newRoom.save();
		await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
		res.status(201).json(savedRoom);
	} catch (err) {
		next(err);
	}
};

//UPDATE room
export const roomPutController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const updatedRoom = await Room.findByIdAndUpdate(id, { $set: req.body }, { new: true });
		res.status(200).json(updatedRoom);
	} catch (err) {
		next(err);
	}
};

//DELETE room
export const roomDeleteController = async (req, res, next) => {
	const { id, hotelId } = req.params;
	try {
		await Room.findByIdAndDelete(id);
		await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: id } });
		res.status(200).json("Room has been deleted successfully!");
	} catch (err) {
		next(err);
	}
};

//GET room
export const roomGetController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const room = await Room.findById(id);
		res.status(200).json(room);
	} catch (err) {
		next(err);
	}
};

//GET ALL
export const roomGetAllController = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		next(err);
	}
};

export const updateRoomAvailabilityController = async (req, res, next) => {
	try {
		const updatedRoom = await Room.updateOne(
			{ "roomNumbers._id": req.params._id },
			{
				$push: {
					"roomNumbers.$.unavailableDates": req.body.dates,
				},
			},
			{
				new: true,
			}
		);
		console.log(updatedRoom);
		res.status(200).json("room number updated");
	} catch (err) {
		next(err);
	}
};
