const { Track } = require("../models/models");
const express = require("express");
const router = express.Router();
const { upload } = require("../server");

router.post("/tracks/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files sent");
  }

  const { tags, playlists } = req.body;

  const newTrack = new Track({
    filename: req.file.filename,
    originalName: req.file.originalname,
    tags: tags ? tags.split(",") : [],
    playlists: playlists ? playlists.split(",") : [],
  });

  try {
    await newTrack.save();
    res.status(200).send("Upload successfully");
  } catch (error) {
    res.status(500).send(`Error saving in database: ${error}`);
  }
});

module.exports = router;
