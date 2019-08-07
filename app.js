// REQUIREMENTS
const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      ejs        = require("ejs"),
      mongoose   = require("mongoose"),
      Pet        = require("./models/pet")

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/petfolio',
{useNewUrlParser: true, useFindAndModify: false});


// General Routes =========================================

app.get("/", function(req, res){
  res.redirect("/front");
});

app.get("/front", function(req, res){
  res.render("front");
});

// PET RESTFUL ROUTES=====================================

// INDEX ROUTE
app.get("/pets", function(req, res){

  Pet.find({}, function(err, foundPets){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("pets/index", {pets: foundPets});
    }
  });
});

// NEW ROUTE
app.get("/pets/new", function(req, res){
  res.render("pets/new");
});

// CREATE ROUTE
app.post("/pets", function(req, res){

  Pet.create(req.body.pet, function(err, newPet){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log("New Pet Created.");
      console.log(newPet);
      res.redirect("/pets");
    }
  });
});

// EDIT ROUTE

// UPDATE ROUTE

// DESTROY ROUTE



app.listen(3000, function(){
  console.log("Server is now running on port 3000.");
});
