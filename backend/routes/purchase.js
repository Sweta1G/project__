const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const User = require("../models/User");
const auth = require("../middleware/auth");

// POST /api/purchase
router.post("/", auth, async (req, res) => {
	try {
		const validCategories = [
			"Retro",
			"Streetwear",
			"Ethnic",
			"Formal",
			"Chic",
			"Partywear",
		];

		let category = req.body.category;
		category =
			category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

		if (!validCategories.includes(category)) {
			return res.status(400).json({ msg: "Invalid category" });
		}

		const purchase = new Purchase({
			user: req.user.id,
			category,
		});

		await purchase.save();

		await User.findByIdAndUpdate(req.user.id, {
			$inc: { [`purchases.${category}`]: 1 },
		});

		res.status(201).json({ msg: "Purchase recorded successfully" });
	} catch (err) {
		console.error("Purchase Error:", err);
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
