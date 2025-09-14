const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

// Import Routes
const authRoutes = require("./routes/auth"); // login/signup routes
const purchaseRoutes = require("./routes/purchase");
const videoFeedRoutes = require("./routes/videoFeed");

const app = express();

// Middleware
app.use(express.json()); // to parse JSON bodies
app.use(cors()); // enable CORS

// MongoDB Connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/video-feed", videoFeedRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
