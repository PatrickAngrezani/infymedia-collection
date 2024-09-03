const { Track, Playlist } = require("../models/models");
const express = require("express");
const router = express.Router();
const { upload } = require("../server");
const { protect } = require("../middlewares/authMiddleware");


router.post("/tracks/upload", protect, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files sent");
  }

  const { tags, playlists } = req.body;
  const playlistArray = playlists ? playlists.split(",") : [];

  const checkPlaylistsExists = await Playlist.find({
    name: { $in: playlistArray },
  });

  const existingPlaylist = checkPlaylistsExists.map(
    (playlist) => playlist.name
  );

  const newTrack = new Track({
    filename: req.file.filename,
    originalName: req.file.originalname,
    tags: tags ? tags.split(",") : [],
    playlists: existingPlaylist,
  });

  try {
    await newTrack.save();
    res.status(200).send("Upload successfully");
  } catch (error) {
    res.status(500).send(`Error saving in database: ${error}`);
  }
});

router.delete("/tracks/delete/:id", protect, async (req, res) => {
  try {
    const trackId = req.params.id;
    const deletedTrack = await Track.findByIdAndDelete(trackId);

    if (!deletedTrack) {
      return res.status(404).send("Track not found");
    }

    res.status(200).json({
      message: "Track deleted succesfully",
      track: deletedTrack,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.put("/tracks/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { filename, tags } = req.body;

    const track = await Track.findByIdAndUpdate(
      id,
      { filename, tags },
      { new: true }
    );

    if (!track) {
      return res.status(404).send("Track not found");
    }

    res.status(200).json(track);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/tracks/:id?", protect, async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const track = await Track.findById(id);

      return track
        ? res.status(200).json(tracks)
        : res.status(404).send("Track not found");
    } else {
      const tracks = await Track.find();
      res.status(200).json(tracks);
    }
  } catch (error) {
    console.error(error);

    res.status(500).send("Error getting tracks");
  }
});

module.exports = router;
