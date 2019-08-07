const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      Pet        = require("../models/pet"),
      Img        = require("../models/img");


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
router.get("/new", function(req, res){
  res.render("pets/new");
});

// CREATE ROUTE
router.post("/", function(req, res){

  Pet.create(req.body.pet, function(err, newPet){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log("New Pet Created.");
      console.log(newPet);
      res.redirect("/pets");
    }
  });
});

// SHOW ROUTE
router.get("/:id", function(req, res){
  Pet.
    findById(req.params.id).
    populate("imgs").
    exec(function(err, foundPet){
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.render("pets/show", {pet: foundPet, imgs: foundPet.imgs});
      }
    });
});

// EDIT ROUTE
router.get("/:id/edit", function(req, res){
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
router.put("/:id", function(req, res){

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
router.delete("/:id", function(req, res){

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




module.exports = router;
