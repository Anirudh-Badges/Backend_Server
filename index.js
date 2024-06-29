const express = require("express");
const viteExpress = require("vite-express");

const app = express();
require("dotenv").config({path:''});

const dbConnect = require("./config/database");
const {cloudinaryConnect} = require('./config/cloudinary');

const route = require('./routes/route');
const profile = require('./routes/profileRouters');
const course = require('./routes/courseRouters');

const passport = require("passport");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173/",
    credentials: true,
}));

// db call
dbConnect;


const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running fine"
    })

})

// fileUpload
app.use(
	fileUpload({
		useTempFiles:true,
        tempFileDir:"/tmp"        
	},{
        limits: { fileSize: 50 * 1024 * 1024 }
    })
)

// cloudinary call
cloudinaryConnect;


// routes
app.use("/api/v1/auth", route);
app.use("/api/v1/profile",profile);
app.use("/api/v1/course", course);


/* passport setup */
let userProfile;
app.use(require('express-session')({ 
    secret: 'Enter your secret key',
    resave: true,
    saveUninitialized: true
  }));
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


const server = app.listen(port, (req, res) => {
    console.log(`Server Started at Port no: ${port}`);
});

viteExpress.bind(app, server);