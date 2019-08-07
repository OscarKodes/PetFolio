const mongoose = require("mongoose");

const petSchema = new mongoose.Schema ({
  name: String,
  sex: String,
  animal: String,
  breed: String,
  info: String,
});

module.exports = mongoose.model("Pet", petSchema);
