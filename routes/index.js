const express       = require("express"),
      router        = express.Router();


router.get("/", function(req, res){
  res.redirect("/front");
});

router.get("/front", function(req, res){
  res.render("front");
});


module.exports = router;
