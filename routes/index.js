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

router.get("/about", function(req, res){
  res.render("about");
});

// Process registration
router.post("/register", function(req, res){
  User.register(
    {username: req.body.username},
    req.body.password,
    function(err, user){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "You have successfully registered! Welcome to Petfolio! ");
        res.redirect("/pets");
      });
    }
  })
});

// Process Login
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "back",
    successFlash: "Welcome! You successfully logged in!",
    failureRedirect: "back",
    failureFlash: true,
  }), function(req, res){
});

// logout
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You successfully logged out!");
  res.redirect("/pets");
});

// User's Profile Page
router.get("/user/:user_id", function(req, res){

  User.
    findById(req.params.user_id).
    populate("pets").
    exec(function(err, foundUser){
    res.render("user", {user: foundUser});
  });
});

// User's Select a pet route to create new image
router.get("/user/:user_id/pet-select", middleware.isLoggedIn, function(req, res){

  User.
    findById(req.params.user_id).
    populate("pets").
    exec(function(err, foundUser){
    res.render("pet-select", {user: foundUser});
  });
});





module.exports = router;
