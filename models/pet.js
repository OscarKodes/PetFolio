const mongoose = require("mongoose");

const petSchema = new mongoose.Schema ({
  name: String,
  gender: String,
  species: String,
  breed: String,
  info: String,
  avatar: String,
  imgs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Img"
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Pet", petSchema);
