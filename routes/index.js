const express       = require("express"),
      router        = express.Router(),
      User          = require("../models/user"),
      passport      = require("passport");


router.get("/", function(req, res){
  res.redirect("/front");
});

router.get("/front", function(req, res){
  res.render("front");
});

// A page for testing user only pages
router.get("/secrets", isLoggedIn,function(req, res){
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
        res.redirect("/secrets");
      });
    }
  })
});






// MIDDLEWARE FUNCTIONS
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/login");
}



module.exports = router;
