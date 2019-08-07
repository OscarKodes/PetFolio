// REQUIREMENTS
const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      ejs        = require("ejs"),
      mongoose   = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/petfolio',
{useNewUrlParser: true, useFindAndModify: false});

const petSchema = new mongoose.Schema ({
  name: String,
  animal: String,
  breed: String,
  info: String,
});

const Pet = mongoose.model("Pet", petSchema);

const newPet = new Pet({
  name: "Box",
  animal: "Dog",
  breed: "Bulldog",
  info: "Box loves to chew on boxes."
});

newPet.save(function(err, savedPet){
  console.log("Successfully added pet.");
  console.log(savedPet);
});


app.get("/", function(req, res){
  res.redirect("/front");
});

app.get("/front", function(req, res){
  res.render("front");
});

app.listen(3000, function(){
  console.log("Server is now running on port 3000.");
});
