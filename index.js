// ----- express -----

var express = require("express");


// ----- server -----

var app = express();


// ----- port -----

var port = 9090;


// ----- db -----

// var db = require("./configs/mongoose");


// ----- flash message -----

var customflash = require('./configs/customflash');

// ----- connect-flash -----

var flash = require('connect-flash');

app.use(flash());

// ----- path -----

var path = require("path")


// ----- view engine ejs -----

app.set("view engine", "ejs")


// ----- view static path -----

app.set("views", path.join(__dirname, "views"))


// ----- assets static path -----

app.use(express.static(path.join(__dirname, "assets")))


// ----- uploads static path -----

app.use("/uploads", express.static(path.join(__dirname, "uploads")))


// ----- encoded -----

app.use(express.urlencoded());

// ----- database online -----
const mongoose = require('mongoose');
mongoose
    .connect("mongodb+srv://khushikathiriyak:khushi777@cluster0.noxxovd.mongodb.net/E-commerce", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('Database connected.'))
    .catch(err => console.log(err));


// ----- cookie pasrser -----

var cookieParser = require("cookie-parser");

app.use(cookieParser())


// ----- passport -----

var passport = require("passport")


// ----- passport local -----

var passportLocal = require("./configs/passport-local")


// ----- session -----

var session = require("express-session");


// ----- session object -----

app.use(session({
    name: "niraj",
    secret: "niraj",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}));


// ----- passport initilization -----

app.use(passport.initialize())


// ----- passport session -----

app.use(passport.session())


// ----- set session data -----

app.use(passport.setAuth)

// ----- set flash -----

app.use(customflash.setflash);


// ----- admin routing -----

app.use("/admin", require("./routes/admin"))


// ----- server connection -----

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`server running on port ${port}`)
})