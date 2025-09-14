const express = require('express');
const router = express.Router();
const VideoPost = require('../models/VideoPost');
// TODO: Add authentication middleware

// Get all video posts (feed)
router.get('/', async (req, res) => {
  try {
    const posts = await VideoPost.find().populate('user', 'username').populate('shoppableProducts');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload a new video post
router.post('/', async (req, res) => {
  try {
    // For now, expect videoUrl, caption, shoppableProducts in body
    const { videoUrl, caption, shoppableProducts, user } = req.body;
    const postData = {
      videoUrl,
      caption,
      shoppableProducts
    };
    if (user) postData.user = user;
    const post = new VideoPost(postData);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: 'Upload failed' });
  }
});

module.exports = router;
