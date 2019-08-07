// REQUIREMENTS
const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      ejs        = require("ejs"),
      mongoose   = require("mongoose"),
      Pet        = require("./models/pet"),
      Img        = require("./models/img"),
      methodOverride = require("method-override"),
      seedDB     = require("./seed");

// REQUIRE ROUTE MODULE FILES
const petRoutes = require("./routes/pet");
const imgRoutes = require("./routes/img");
const indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect('mongodb://localhost:27017/petfolio',
{useNewUrlParser: true, useFindAndModify: false});


// SEED DATABASE WITH SAMPLE DATA
// seedDB();


app.use("/pets", petRoutes);
app.use("/pets/:id/imgs", imgRoutes);
app.use(indexRoutes);

app.listen(3000, function(){
  console.log("Server is now running on port 3000.");
});
