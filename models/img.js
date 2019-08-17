const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const imgSchema = new mongoose.Schema ({
  image: String,
  caption: String,
  comments: [commentSchema]
});

module.exports = mongoose.model("Img", imgSchema);
