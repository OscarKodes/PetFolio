const mongoose = require("mongoose");

const petSchema = new mongoose.Schema ({
  name: String,
  gender: String,
  species: String,
  breed: String,
  info: String,
  imgs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Img"
    }
  ]
});

module.exports = mongoose.model("Pet", petSchema);
