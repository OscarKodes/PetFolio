const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      middleware    = require("../middleware"),
      Pet        = require("../models/pet"),
      Img        = require("../models/img"),
      User          = require("../models/user"),
      ImgurStorage  = require("@trevorblades/multer-storage-imgur"),
      multer        = require("multer");

const upload = multer({
  storage: ImgurStorage({
    clientId: process.env.IMGUR_CLIENT_ID
  })
});


// PET RESTFUL ROUTES=====================================

// INDEX ROUTE
router.get("/", function(req, res){

  Pet.find({}, function(err, foundPets){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("pets/index", {pets: foundPets});
    }
  });
});


// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("pets/new");
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, upload.single("avatar"), function(req, res){

  let petObj = req.body.pet;
  petObj.avatar = req.file.data.link;

  User.findById(req.body.user_id, function(err, foundUser){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
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
          req.flash("success", "New pet successfully added!");
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
        req.flash("error", err.message);
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

// EDIT INFO ROUTE
router.get("/:id/edit", middleware.checkPetOwnership, function(req, res){
  Pet.findById(req.params.id, function(err, foundPet){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("pets/edit", {pet: foundPet});
    }
  });
});

// UPDATE INFO ROUTE
router.put("/:id", middleware.checkPetOwnership, function(req, res){

  Pet.findByIdAndUpdate(
    req.params.id,
    req.body.pet,
    function(err, foundPet){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      req.flash("success", "Pet info successfully edited!");
      res.redirect("/pets/" + req.params.id);
    }
  });
});

// EDIT AVATAR ROUTE
router.get("/:id/editAvatar", middleware.checkPetOwnership, function(req, res){
  Pet.findById(req.params.id, function(err, foundPet){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("pets/editAvatar", {pet: foundPet});
    }
  });
});

// UPDATE AVATAR ROUTE
router.put("/:id/avatar", middleware.checkPetOwnership, upload.single("avatar"), function(req, res){

  Pet.findById(req.params.id, function(err, foundPet){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      foundPet.avatar = req.file.data.link;
      foundPet.save();
      req.flash("success", "Pet avatar successfully changed!");
      res.redirect("/pets/" + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkPetOwnership, function(req, res){

  Pet.findByIdAndDelete(req.params.id, function(err, deletedPet){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      console.log("Pet deleted");
      console.log(deletedPet);
      req.flash("success", "Pet successfully deleted!");
      res.redirect("/pets");
    }
  })
});


module.exports = router;
