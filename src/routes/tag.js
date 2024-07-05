const { Tag } = require("../models/models");
const express = require("express");
const router = express.Router();

router.post("/create-tag", async (req, res) => {
  const { name } = req.body;

  try {
    const existingTag = await Tag.findOne({ name });

    if (existingTag) {
      return res.status(409).send("Invalid tag name");
    }

    const newTag = new Tag({ name });
    await newTag.save();

    res.status(201).send("Tag created succesfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating tag:", error);
  }
});

module.exports = router;
