const mongoose = require("mongoose");

const petSchema = new mongoose.Schema ({
  name: String,
  gender: String,
  species: String,
  breed: String,
  info: String,
});

module.exports = mongoose.model("Pet", petSchema);
