const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://harshiv:Allizwe11!@whisperspace-cluster.os49vhv.mongodb.net/?retryWrites=true&w=majority&appName=whisperspace-cluster';

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose model
const whisperSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now },
  replies: [{ text: String, timestamp: { type: Date, default: Date.now } }]
});
const Whisper = mongoose.model('Whisper', whisperSchema);

// POST route
app.post('/api/whispers', async (req, res) => {
  try {
    const newWhisper = new Whisper({ text: req.body.text });
    await newWhisper.save();
    res.status(201).json(newWhisper);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save whisper' });
  }
});

// GET route
app.get('/api/whispers', async (req, res) => {
  try {
    const whispers = await Whisper.find().sort({ timestamp: -1 });
    res.json(whispers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch whispers' });
  }
});

// Connect to MongoDB and start server
mongoose.connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
