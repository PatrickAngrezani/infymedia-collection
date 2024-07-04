const multer = require("multer");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");

const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname.split(".")[1]));
  },
});

const upload = multer({ storage: storage });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = { app, upload };

const uploadRouter = require("./routes/tracks");
const playlistRouter = require("./routes/playlists");
app.use("/", uploadRouter);
app.use("/", playlistRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
