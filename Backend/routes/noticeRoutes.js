// routes/noticeRoutes.js
const express = require('express');
const router = express.Router();
const Notice = require('../model/Notice');

// GET all notices
router.get('/get', async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
});

// POST a new notice
router.post('/post', async (req, res) => {
  const { title, description } = req.body;
  const newNotice = new Notice({ title, description });
  await newNotice.save();
  res.status(201).json(newNotice);
});

// DELETE a notice
router.delete('/delete/:id', async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: 'Notice deleted' });
});

module.exports = router;
