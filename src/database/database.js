const mongoose = require("mongoose");

mongoose.connect("mongodb://infymedia-collection-mongo:27017/infymediacollection", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
