const express = require("express");

const app = express();
require("dotenv").config({path:''});

const dbConnect = require("./config/database");
const route = require('./routes/route');
const profile = require('./routes/profileRouters');
const passport = require("passport");
const cookieParser = require("cookie-parser");


// middleware
app.use(express.json());
app.use(cookieParser());

// db call
dbConnect;

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running fine"
    })

})


// routes
app.use("/api/v1/auth", route);
app.use("/api/v1/profile",profile);


/* passport setup */
let userProfile;
// app.use(require('express-session')({ 
//     secret: 'Enter your secret key',
//     resave: true,
//     saveUninitialized: true
//   }));
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');

app.get('/success', (req, res) => {
    res.send(userProfile)
})

app.get('/error', (req, res) => {
    res.send("error logging in");
})

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
})



/* Google Auth*/

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Google_ClientId = process.env.CLIENT_ID;
const Goolge_ClientSecret = process.env.CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: Google_ClientId,
    clientSecret: Goolge_ClientSecret,
    callbackURL: process.env.CALLBACK_URL
}, 
 (accessToken,refreshToken,profile,done) => {
    userProfile = profile;
    return done(null,userProfile);
 }
));

app.get('/auth/google',
    passport.authenticate("google", {scope : ['profile','email']})
);

app.get(`/auth/google/callback`,
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect success.
      res.redirect('/success');
    }  
)


app.listen(port, (req, res) => {
    console.log(`Server Started at Port no: ${port}`);
});