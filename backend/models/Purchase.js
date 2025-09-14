// // // models/Purchase.js
// // const mongoose = require("mongoose");

// // const purchaseSchema = new mongoose.Schema(
// // 	{
// // 		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // links to User
// // 		productId: { type: String }, // optional product id
// // 		category: { type: String }, // e.g., Streetwear, Retro, Chic
// // 		type: { type: String }, // product type like T-shirt, Jacket
// // 		date: { type: Date, default: Date.now }, // timestamp
// // 	},
// // 	{ collection: "userHistory" } // explicitly set collection name
// // );

// // module.exports = mongoose.model("Purchase", purchaseSchema);

// const mongoose = require("mongoose");

// const PurchaseSchema = new mongoose.Schema({
// 	user: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: "User",
// 		required: true,
// 	},
// 	category: {
// 		type: String,
// 		required: true,
// 	},
// 	date: {
// 		type: Date,
// 		default: Date.now,
// 	},
// });

// module.exports = mongoose.model("Purchase", PurchaseSchema);

const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	category: {
		type: String,
		enum: ["Retro", "Streetwear", "Ethnic", "Formal", "Chic", "Partywear"], // prevent invalid categories
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Purchase", purchaseSchema);
