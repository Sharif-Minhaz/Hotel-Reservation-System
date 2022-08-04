import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roomSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		maxPeople: {
			type: Number,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
	},
	{ timestamps: true }
);

export default model("room", roomSchema);
