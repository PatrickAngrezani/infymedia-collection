const { Track, Playlist } = require("../models/track");
const express = require("express");
const router = express.Router();

router.post("/create-playlist", async (req, res) => {
  const { name, tracks } = req.body;

  console.log({ body: req.body });

  try {
    const newPlaylist = new Playlist({ name, tracks });
    await newPlaylist.save();

    // update tracks in reference to new playlist
    if (tracks && tracks.length > 0) {
      await Track.updateMany(
        { _id: { $in: tracks } },
        { $addToSet: { playlists: newPlaylist._id } }
      );
    }
    res.status(200).send("Playlist created succesfully");
  } catch (error) {
    res.status(500).send("Error creating playlist:", error);
  }
});

router.get("/playlists", async (req, res) => {
  // Recuperar playlists do banco de dados
  res.status(200).json(playlists);
});

module.exports = router;
