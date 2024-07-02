const { Track, Playlist } = require("../models/models");
const express = require("express");
const router = express.Router();

router.post("/create-playlist", async (req, res) => {
  const { name } = req.body;

  try {
    const newPlaylist = new Playlist({ name });
    await newPlaylist.save();

    res.status(201).send("Playlist created succesfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating playlist");
  }
});

router.get("/playlists", async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting playlists");
  }
});

module.exports = router;
