const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const mongoose = require('mongoose');
const Bet = require('./api/models/betModel'); //created model loading here
const User = require('./api/models/userModel'); //created model loading here
const bodyParser = require('body-parser');
const args = process.argv.slice(2);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const http  = require('http');
const https  = require('https');
const fs = require('fs');
const crypto = require('crypto');

// enable cores application wide
app.use(cors());

// SSL
let options = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.cert')
};

// Auth
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connection
mongoose.Promise = Promise;
let path = args[0] === 'local' ? 'mongodb://localhost/who2beton' : 'mongodb://mongo/who2beton';
console.log(path);
mongoose.connect(path, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const betRoutes = require('./api/routes/betRoutes'); //importing route
betRoutes(app); //register the route

const userRoutes = require('./api/routes/userRoutes'); //importing route
userRoutes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({error: req.originalUrl + ' not found'})
});

//app.listen(port);
http.createServer(app).listen(port);
//https.createServer(options, app).listen(443);

// Because
const because = require('./because');
because();

console.log('api started on: ' + port);
