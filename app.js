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
FacebookStrategy = require("passport-facebook").Strategy,
middleware    = require("./middleware"),
findOrCreate  = require("mongoose-findorcreate");

// REQUIRE ROUTE MODULE FILES
const petRoutes = require("./routes/pet");
const imgRoutes = require("./routes/img");
const commentRoutes = require("./routes/comment");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// this is middleware function that will run in every route
app.use(function(req, res, next){
  res.locals.currUser = req.user;
  next();
});


mongoose.connect('mongodb://localhost:27017/petfolio',
{useNewUrlParser: true, useFindAndModify: false});
mongoose.set("useCreateIndex", true);


// SEED DATABASE WITH SAMPLE DATA
// seedDB();


app.use("/pets", petRoutes);
app.use("/pets/:id/imgs", imgRoutes);
app.use("/pets/:id/imgs/:img_id/comments", commentRoutes);
app.use("/auth", authRoutes);
app.use(indexRoutes);

app.listen(3000, function(){
  console.log("Server is now running on port 3000.");
});
