// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		purchases: {
			Retro: { type: Number, default: 0 },
			Streetwear: { type: Number, default: 0 },
			Ethnic: { type: Number, default: 0 },
			Formal: { type: Number, default: 0 },
			Chic: { type: Number, default: 0 },
			Partywear: { type: Number, default: 0 },
		},
	},
	{ collection: "userHistory" } // force Mongoose to use your collection name
);

module.exports = mongoose.model("User", userSchema);
