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

// // SHOW ROUTE
// router.get("/:id", function(req, res){
//   Img.findById(req.params.id, function(err, foundImg){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       res.render("imgs/show", {img: foundImg});
//     }
//   });
// });
//
// // EDIT ROUTE
// router.get("/:id/edit", function(req, res){
//   Img.findById(req.params.id, function(err, foundImg){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       res.render("imgs/edit", {img: foundImg});
//     }
//   });
// });
//
// // UPDATE ROUTE
// router.put("/:id", function(req, res){
//
//   Img.findByIdAndUpdate(
//     req.params.id,
//     req.body.img,
//     function(err, foundImg){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       res.redirect("/imgs/" + req.params.id);
//     }
//   });
// });
//
// // DESTROY ROUTE
// router.delete("/:id", function(req, res){
//
//   Img.findByIdAndDelete(req.params.id, function(err, deletedImg){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       console.log("Img deleted");
//       console.log(deletedImg);
//       res.redirect("/imgs");
//     }
//   })
// });






module.exports = router;
