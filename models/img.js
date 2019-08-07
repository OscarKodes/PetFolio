const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema ({
  image: String,
  caption: String
});

module.exports = mongoose.model("Img", imgSchema);
