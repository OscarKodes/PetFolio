const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      middleware    = require("../middleware"),
      Pet        = require("../models/pet"),
      Img        = require("../models/img"),
      User       = require("../models/user");


// RESTFUL ROUTES

// Index Route
//// This route is covered by the comments being shown on the show img page

// New Route
//// This route is covered by the comment form on the show img page

// Create Route
router.post("/", function(req, res){

  let newComment = {
    text: req.body.text
  }

  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      foundImg.comments.unshift(newComment);
      foundImg.comments[0].user = req.params.id;
      foundImg.save();
      res.redirect("/pets/" + req.params.id + "/imgs/" + req.params.img_id);
    }
  });
});

// Show Route
//// No need for show comments route

// Edit Route

// Update Route

// Destroy Route


module.exports = router;
