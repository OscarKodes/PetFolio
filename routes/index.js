const express       = require("express"),
      router        = express.Router(),
      middleware    = require("../middleware"),
      User          = require("../models/user"),
      passport      = require("passport");


router.get("/", function(req, res){
  res.redirect("/front");
});

router.get("/front", function(req, res){
  res.render("front");
});

// A page for testing user only pages
router.get("/secrets", middleware.isLoggedIn, function(req, res){
  res.render("secrets");
});

// Render register form
router.get("/register", function(req, res){
  res.render("register");
});

// Process registration
router.post("/register", function(req, res){
  User.register(
    {username: req.body.username},
    req.body.password,
    function(err, user){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/pets");
      });
    }
  })
});

// Render login form
router.get("/login", function(req, res){
  res.render("login");
});

// Process Login
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/pets",
    failureRedirect: "/login"
  }), function(req, res){
});

// logout
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/pets");
});






module.exports = router;
