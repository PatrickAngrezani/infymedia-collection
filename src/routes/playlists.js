const { Playlist } = require("../models/models");
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.post("/create-playlist", protect, async (req, res) => {
  const { name } = req.body;

  try {
    const existingPlaylist = await Playlist.findOne({ name });

    if (existingPlaylist) {
      return res.status(409).send("Invalid playlist name");
    }

    const newPlaylist = new Playlist({ name });
    await newPlaylist.save();

    res.status(201).send("Playlist created succesfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating playlist");
  }
});

router.get("/playlists/:id?", protect, async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const playlist = await Playlist.findById(id);

      return playlist
        ? res.status(200).json(playlist)
        : res.status(404).send("Playlist not found");
    } else {
      const playlists = await Playlist.find();
      res.status(200).json(playlists);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting playlists");
  }
});

router.delete("/playlists/:id", protect, async (req, res) => {
  try {
    const playlistId = req.params.id;
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

    if (!deletedPlaylist) {
      return res.status(404).send("Playlist not found");
    }

    res.status(200).json({
      message: "Playlist deleted succesfully",
      playlist: deletedPlaylist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.put("/playlists/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const playlist = await Playlist.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );

    if (!playlist) {
      return res.status(404).send("Playlist not found");
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
