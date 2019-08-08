const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      passport      = require("passport"),
      User          = require("../models/user"),
      GoogleStrategy = require("passport-google-oauth20").Strategy,
      FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get("/google",
  passport.authenticate("google", {scope: ["profile"]})
);

router.get("/google/petfolio", passport.authenticate("google",
  {
    successRedirect: "/pets",
    failureRedirect: "/pets"
  }), function(req, res){

  }
);

router.get("/facebook",
  passport.authenticate("facebook")
);

router.get("/facebook/petfolio", passport.authenticate("facebook",
  {
    successRedirect: "/pets",
    failureRedirect: "/pets"
  }), function(req, res){

  }
);




module.exports = router;
