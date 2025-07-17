const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const whisperSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now },
  replies: [replySchema]
});

module.exports = mongoose.model('Whisper', whisperSchema);
