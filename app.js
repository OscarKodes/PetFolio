// REQUIREMENTS
const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      ejs        = require("ejs"),
      mongoose   = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.redirect("/front");
});

app.get("/front", function(req, res){
  res.render("front");
});

app.listen(3000, function(){
  console.log("Server is now running on port 3000.");
});
