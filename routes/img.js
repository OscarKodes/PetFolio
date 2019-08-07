const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      Pet        = require("../models/pet"),
      Img        = require("../models/img");


// PET RESTFUL ROUTES=====================================

// INDEX ROUTE
//// THE PET SHOW ROUTE COUNTS AS AN INDEX ROUTE FOR IMGS

// NEW ROUTE
router.get("/new", function(req, res){
  res.render("imgs/new", {pet_id: req.params.id});
});

// CREATE ROUTE
router.post("/", function(req, res){

  Img.create(req.body.img, function(err, newImg){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      Pet.findById(req.params.id, function(err, foundPet){
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          foundPet.imgs.push(newImg);
          foundPet.save();
          console.log("New Img Created.");
          console.log(newImg);
          res.redirect("/pets/" + req.params.id);
        }
      });
    }
  });
});

// SHOW ROUTE
router.get("/:img_id", function(req, res){
  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("imgs/show", {img: foundImg, pet_id: req.params.id});
    }
  });
});

// EDIT ROUTE
router.get("/:img_id/edit", function(req, res){
  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("imgs/edit", {img: foundImg, pet_id: req.params.id});
    }
  });
});

// UPDATE ROUTE
router.put("/:img_id", function(req, res){

  Img.findByIdAndUpdate(
    req.params.img_id,
    req.body.img,
    function(err, foundImg){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/pets/" + req.params.id + "/imgs/" + req.params.img_id);
    }
  });
});

// DESTROY ROUTE
router.delete("/:img_id", function(req, res){

  Img.findByIdAndDelete(req.params.img_id, function(err, deletedImg){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log("Img deleted");
      console.log(deletedImg);
      res.redirect("/pets/" + req.params.id);
    }
  });
});






module.exports = router;
