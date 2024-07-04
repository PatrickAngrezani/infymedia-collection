const mongoose = require("../database/database");

const trackSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  tags: [String],
  playlists: [String],
  uploadedAt: { type: Date, default: Date.now },
});

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
});

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Track = mongoose.model("Track", trackSchema);
const Playlist = mongoose.model("Playlist", playlistSchema);
const Tag = mongoose.model("Tag", tagSchema);

module.exports = { Track, Playlist, Tag };
