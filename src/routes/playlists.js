const Track = require("../models/track");
const express = require("express");
const router = express.Router();

router.post("/create-playlist", async (req, res) => {
  const { name, tracks } = req.body;
  // Salvar playlist no banco de dados
  res.status(200).send("Playlist criada com sucesso");
});

router.get("/playlists", async (req, res) => {
  // Recuperar playlists do banco de dados
  res.status(200).json(playlists);
});
