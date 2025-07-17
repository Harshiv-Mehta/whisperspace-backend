const express = require('express');
const router = express.Router();
const Whisper = require('../models/Whisper');

// POST /api/whispers
router.post('/', async (req, res) => {
  try {
    const whisper = new Whisper({ text: req.body.text });
    await whisper.save();
    res.status(201).json(whisper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/whispers
router.get('/', async (req, res) => {
  try {
    const whispers = await Whisper.find().sort({ timestamp: -1 });
    res.json(whispers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/whispers/:id/replies
router.post('/:id/replies', async (req, res) => {
  try {
    const whisper = await Whisper.findById(req.params.id);
    if (!whisper) return res.status(404).json({ error: 'Whisper not found' });

    whisper.replies.push({ text: req.body.text });
    await whisper.save();
    res.status(201).json(whisper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
