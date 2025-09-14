const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth"); // JWT middleware

// SECRET for JWT
JWT_SECRET = "mysupersecretkey123!@";
// routes/auth.js (example)

// SIGNUP
router.get("/profileDNA", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) return res.status(404).json({ msg: "User not found" });

		// send purchases object
		res.json({ purchases: user.purchases });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Server error" });
	}
});

// router.get("/profile", auth, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.user.id).select("-password"); // remove password
// 		res.json(user);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// });
router.post("/signup", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ msg: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);

		user = new User({
			username,
			email,
			password: hashedPassword,
		});

		await user.save();

		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
		res.json({
			token,
			user: { id: user._id, username, email, purchases: user.purchases },
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Server error" });
	}
});

// LOGIN
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
		res.json({
			token,
			user: {
				id: user._id,
				username: user.username,
				email,
				purchases: user.purchases,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Server error" });
	}
});

module.exports = router;
