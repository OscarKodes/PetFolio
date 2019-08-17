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
router.post("/", middleware.isLoggedIn, function(req, res){

  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      foundImg.comments.push(req.body.comment);
      foundImg.save();
      res.redirect("/pets/" + req.params.id + "/imgs/" + req.params.img_id);
    }
  });
});

// Show Route
//// No need for show comments route

// Edit Route
router.get("/:comment_idx/edit", middleware.checkCommentOwnership, function(req, res){

  let idx = req.params.comment_idx;

  Img.findById(req.params.img_id, function(err, foundImg){
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        let comment = foundImg.comments[idx];
        res.render("comments/edit",
        {
          img_id: foundImg._id,
          pet_id: req.params.id,
          comment: comment,
          comment_idx: idx
        });
      }
  });
});

// Update Route
router.put("/:comment_idx", middleware.checkCommentOwnership, function(req, res){

  let idx = req.params.comment_idx;

  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      foundImg.comments[idx].text = req.body.text;
      foundImg.save();
      res.redirect("/pets/" + req.params.id + "/imgs/" + req.params.img_id);
    }
  })
});

// Destroy Route

router.delete("/:comment_idx", middleware.checkCommentOwnership, function(req, res){

  let idx = req.params.comment_idx;

  Img.findById(req.params.img_id, function(err, foundImg){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      foundImg.comments.splice(idx, 1);
      foundImg.save();
      res.redirect("/pets/" + req.params.id + "/imgs/" + req.params.img_id);
    }
  })
});


module.exports = router;
