const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema ({
  image: String,
  caption: String,
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet"
  }
});

module.exports = mongoose.model("Img", picSchema);
