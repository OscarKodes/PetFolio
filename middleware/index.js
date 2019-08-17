// require used schema models
const Pet = require("../models/pet");
const Img = require("../models/img");
const User = require("../models/user");

// all middleware goes here

let middlewareObj = {};

middlewareObj.checkPetOwnership = function(req, res, next) {

  // check if user is logged in
  if (req.isAuthenticated()){

    // search for the current pet with id
    Pet.findById(req.params.id, function(err, foundPet){
      if (err) {
        console.log("THERE WAS AN ERROR:", err);
        res.redirect("back");
      } else {

        // does user own campground?
        if (foundPet.user && foundPet.user._id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {

  let idx = req.params.comment_idx;

  // check if user is logged in
  if (req.isAuthenticated()){

    // search for the current pet with id
    Img.findById(req.params.img_id, function(err, foundImg){
      if (err) {
        console.log("THERE WAS AN ERROR:", err);
        res.redirect("back");
      } else {

        // does user own campground?
        if (req.user._id.equals(foundImg.comments[idx].user_id)){
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("back");
}

module.exports = middlewareObj;
