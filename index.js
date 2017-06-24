//Bare bones server intialization.
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const port = process.env.PORT || 3000;
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const config = require('./config/config.js')
//cookie monster's code repos!
var flash = require('connect-flash');
var cookieParser = require('cookie-parser')
var session = require('express-session')
//Require if modular code is put in helper:
//var helper = require('./helpers/helper');


const app = express()

const db = require('./db')

//enabling various cookie /session /flash functionality! <('.')>
app.use(cookieParser());
app.use(session({secret: 'recursive raccoon', resave: true, saveUninitialized: false}));


//passport authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Require all created models:
var Message = require('./models/message');
var User = require('./models/user');
var Event = require('./models/event');

// Middleware to parse body:
app.use(bodyParser.json());

//Paths to look for files to import (can have many):
app.use(express.static(path.resolve(__dirname, './node_modules')))

app.use(express.static(path.resolve(__dirname, './home')))

//Passport facebook strategy config:

passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID, 
    clientSecret:  config.FACEBOOK_APP_SECRET, 
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('this is the facebook returned profile', profile)
    User.findOne({
      'facebook.id':profile.id
    }, function(err, user) {
      if (err) {
        console.error(err)
        return done(err)
      }
      if (!user) {
        console.log("new user created");
        user = new User({
          user: profile.displayName,
          picture: profile.photos[0].value,
          email: profile.emails[0].value,
          facebook: profile._json
        });
        user.save(function(err) {
          if (err) console.error(err);
          return done(null, user)
        })
      } else {
        console.log('user found')
        return done(null, user);
      }
    })
  }
))    

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, done) {
  console.log("serialize user: ", user.user);
  done(null, user.facebook.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialize id :', id);
  User.findOne({'facebook.id':id}, function(err, user) {
    done(err, user);
  });
});

//Get and post methods should be delegated to routes.js file to simplify and modularize
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback || index
app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });





app.get('/account', function(req, res){
   if (req.isAuthenticated()) { 
     res.send({user : req.user}); 
   }else{
     res.sendStatus(404);
   }
 });

app.get('/error', function(req, res) {
  res.sendStatus(404);
})

app.get('/timer', function(req, res) {
  var id = Number(req.url.split(':').slice(1)); //this should be the url endpoint; 
  Event.findOne({id: id}).exec(function(err, data) {
    res.json(200, data);
  });
})
//Get and post methods for events on app/home page

app.post('/events', function(req, res){
  var newEvent = new Event ({
    name: req.body.name,
    description: req.body.description,
    host: req.body.host,
    type: req.body.type,
    time: req.body.time,
    price: req.body.price || 0,
    desiredParticipants: req.body.desiredParticipants,
    location: req.body.location
  });
  newEvent.save(function(err, newEvent){
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(newEvent);
    }
  });
});

app.get('/events', function(req, res){
  Event.find({}, function(err, events) {
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(events);
    }
  });
});


//Server init to listen on port 3000 -> Needs to be altered for deployment
app.listen(port);
console.log('Greenfield server running on :3000');
//here is a change.
