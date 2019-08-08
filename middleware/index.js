// require used schema models

// all middleware goes here

let middlewareObj = {};

middlewareObj.checkPetOwnership = function(req, res, next) {
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/login");
}

module.exports = middlewareObj;
