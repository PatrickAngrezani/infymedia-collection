const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  tags: [String],
  playlists: [String],
  uploadedAt: { type: Date, default: Date.now },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
