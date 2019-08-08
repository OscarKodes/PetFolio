// REQUIREMENTS
require('dotenv').config();
const express = require("express"),
app           = express(),
bodyParser    = require("body-parser"),
ejs           = require("ejs"),
mongoose      = require("mongoose"),
Pet           = require("./models/pet"),
Img           = require("./models/img"),
User          = require("./models/user"),
methodOverride = require("method-override"),
seedDB        = require("./seed"),
session       = require("express-session"),
passport      = require("passport"),
passportLocalMongoose = require("passport-local-mongoose"),
GoogleStrategy = require("passport-google-oauth20").Strategy,
findOrCreate  = require("mongoose-findorcreate");

// REQUIRE ROUTE MODULE FILES
const petRoutes = require("./routes/pet");
const imgRoutes = require("./routes/img");
const indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect('mongodb://localhost:27017/petfolio',
{useNewUrlParser: true, useFindAndModify: false});
mongoose.set("useCreateIndex", true);


// SEED DATABASE WITH SAMPLE DATA
// seedDB();


app.use("/pets", petRoutes);
app.use("/pets/:id/imgs", imgRoutes);
app.use(indexRoutes);

app.listen(3000, function(){
  console.log("Server is now running on port 3000.");
});
