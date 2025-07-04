const express = require('express');
const router = express.Router();
const Notice = require('../model/Notice');
const auth = require('../middleware/authMiddleware');

// GET all notices (public)
router.get('/get', async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
});

// POST notice (protected)
router.post('/post', auth, async (req, res) => {
  const { title, description } = req.body;
  const newNotice = new Notice({ title, description });
  await newNotice.save();
  res.status(201).json(newNotice);
});

// DELETE notice (protected)
router.delete('/delete/:id', auth, async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: 'Notice deleted' });
});

module.exports = router;
