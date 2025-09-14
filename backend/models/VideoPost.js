const mongoose = require('mongoose');

const VideoPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  videoUrl: { type: String, required: true },
  caption: { type: String },
  shoppableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VideoPost', VideoPostSchema);
