require("dotenv").config({ path: "../.env" });

const multer = require("multer");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 4000;

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname.split(".")[1]));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = { app, upload };

const trackRouter = require("./routes/tracks");
const playlistRouter = require("./routes/playlists");
const tagRouter = require("./routes/tag");
const userRouter = require("./routes/users");

app.use("/", trackRouter);
app.use("/", playlistRouter);
app.use("/", tagRouter);
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
