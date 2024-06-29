const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { app, upload };

const uploadRouter = require("./routes/upload");
app.use("/", uploadRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
