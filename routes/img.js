const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      middleware    = require("../middleware"),
      Pet        = require("../models/pet"),
      Img        = require("../models/img"),
      ImgurStorage  = require("@trevorblades/multer-storage-imgur"),
      multer        = require("multer");

const upload = multer({
  storage: ImgurStorage({
    clientId: process.env.IMGUR_CLIENT_ID
  })
});

// PET RESTFUL ROUTES=====================================

// INDEX ROUTE
//// THE PET SHOW ROUTE COUNTS AS AN INDEX ROUTE FOR IMGS

// NEW ROUTE
router.get("/new", middleware.checkPetOwnership, function(req, res){
  Pet.findById(req.params.id, function(err, foundPet){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("imgs/new", {pet: foundPet});
    }
  });
});

// CREATE ROUTE
// router.post("/", middleware.checkPetOwnership, function(req, res){
router.post("/", upload.single("image"), function(req, res){

  let imgObj = {
    image: req.file.data.link,
    caption: req.body.caption
  }

  Img.create(imgObj, function(err, newImg){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      Pet.findById(req.params.id, function(err, foundPet){
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          foundPet.imgs.push(newImg);
          foundPet.save();
          req.flash("success", "Post successfully create!");
          res.redirect("/pets/" + req.params.id);
        }
      });
    }
  });
});

// SHOW ROUTE
router.get("/:img_id", function(req, res){
  Img.
    findById(req.params.img_id).
    populate("comments[user]").
    exec(function(err, foundImg){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      console.log(foundImg);
      Pet.findById(req.params.id, function(err, foundPet){
        if (err){
          console.log(err);
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          res.render("imgs/show", {img: foundImg, pet: foundPet, });
        }
      });
    }
  });
});

// EDIT CAPTION ROUTE
router.get("/:img_id/edit", middleware.checkPetOwnership, function(req, res){
  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("imgs/edit", {img: foundImg, pet_id: req.params.id});
    }
  });
});

// UPDATE CAPTION ROUTE
router.put("/:img_id", middleware.checkPetOwnership, function(req, res){

  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      foundImg.caption = req.body.caption;
      foundImg.save();
      req.flash("success", "Post successfully edited!");
      res.redirect("/pets/" + req.params.id + "/imgs/" + req.params.img_id);
    }
  });
});

// EDIT IMAGE ROUTE
router.get("/:img_id/edit-image", middleware.checkPetOwnership, function(req, res){
  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("imgs/edit-image", {img: foundImg, pet_id: req.params.id});
    }
  });
});

// UPDATE IMAGE ROUTE
// router.put("/:img_id", middleware.checkPetOwnership, function(req, res){
router.put("/:img_id/edit-image", upload.single("image"), function(req, res){

  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      foundImg.image = req.file.data.link;
      foundImg.save();
      req.flash("success", "Post successfully edited!");
      res.redirect("/pets/" + req.params.id + "/imgs/" + req.params.img_id);
    }
  });
});

// DESTROY ROUTE
router.delete("/:img_id", middleware.checkPetOwnership, function(req, res){

  Img.findByIdAndDelete(req.params.img_id, function(err, deletedImg){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      console.log("Img deleted");
      console.log(deletedImg);
      req.flash("success", "Post successfully deleted!");
      res.redirect("/pets/" + req.params.id);
    }
  });
});




module.exports = router;
