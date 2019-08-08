const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      Pet        = require("../models/pet"),
      Img        = require("../models/img"),
      User          = require("../models/user");


// PET RESTFUL ROUTES=====================================

// INDEX ROUTE
router.get("/", function(req, res){

  Pet.find({}, function(err, foundPets){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("pets/index", {pets: foundPets});
    }
  });
});

// NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
  res.render("pets/new");
});

// CREATE ROUTE
router.post("/", isLoggedIn, function(req, res){

  let petObj = req.body.pet;

  User.findById(req.body.user_id, function(err, foundUser){
    if (err) {
      console.log(err);
      res.redirect("back")
    } else {
      petObj.user = req.body.user_id;
      Pet.create(petObj, function(err, newPet){
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          foundUser.pets.push(newPet._id);
          foundUser.save();
          console.log("New Pet Created.");
          console.log(foundUser);
          res.redirect("/pets");
        }
      });
    }
  });
});

// SHOW ROUTE
router.get("/:id", function(req, res){
  Pet.
    findById(req.params.id).
    populate("imgs").
    populate("user").
    exec(function(err, foundPet){
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.render("pets/show",
        {
          pet: foundPet,
          imgs: foundPet.imgs,
          user: foundPet.user
        });
      }
    });
});

// EDIT ROUTE
router.get("/:id/edit", isLoggedIn, function(req, res){
  Pet.findById(req.params.id, function(err, foundPet){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("pets/edit", {pet: foundPet});
    }
  });
});

// UPDATE ROUTE
router.put("/:id", isLoggedIn, function(req, res){

  Pet.findByIdAndUpdate(
    req.params.id,
    req.body.pet,
    function(err, foundPet){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/pets/" + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete("/:id", isLoggedIn, function(req, res){

  Pet.findByIdAndDelete(req.params.id, function(err, deletedPet){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log("Pet deleted");
      console.log(deletedPet);
      res.redirect("/pets");
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
