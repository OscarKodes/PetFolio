const mongoose = require("mongoose");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate  = require("mongoose-findorcreate");


const userSchema = new mongoose.Schema ({
  username: String,
  password: String,
  name: String,
  googleId: String,
  facebookId: String,
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet"
    }
  ]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);



module.exports = mongoose.model("User", userSchema);
