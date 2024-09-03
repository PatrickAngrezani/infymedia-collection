const mongoose = require("../database/database");
const bcrypt = require("bcryptjs");

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

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//middleware to hash passwors before to save
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Track = mongoose.model("Track", trackSchema);
const Playlist = mongoose.model("Playlist", playlistSchema);
const Tag = mongoose.model("Tag", tagSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Track, Playlist, Tag, User };
