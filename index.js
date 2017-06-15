//Bare bones server intialization.
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
let port = process.env.PORT || 3000;
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');

//Require if modular code is put in helper:
//var helper = require('./helpers/helper');

const app = express()

const db = require('./db')

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
    clientID: 123772004874308, //ENV[FACEBOOK_APP_ID]
    clientSecret: 'e332531c73f223466140121ba1a44f21', //ENV[FACEBOOK_APP_SECRET] 
    callbackURL: "https://recrac.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({
      'facebook.id':profile.id
    }, function(err, user) {
      if (err) {
        console.error(err)
        return done(error)
      }
      if (!user) {
        user = new User({
          user: profile.displayName,
          picture: profile.photos[0],
          email: profile.emails[0],
          facebook: profile._json
        });
        user.save(function(err) {
          if (err) console.error(err);
          return done(err, user)
        })
      } else {
        return done(err, user);
      }
    })
  }
))    


//Get and post methods should be delegated to routes.js file to simplify and modularize
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback || index
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


app.get('/history', function(req, res) {
  Message.find({}).exec(function(err, links) {
    if(err){
    	res.status(500).send(err);
    }
    	res.status(200).send(links);
  });

})

app.post('/message', function(req, res) {
  var newMessage = new Message({
  	user: 'Dwho',
  	text: req.body.text,
    mod: req.body.mod,
    modtext: helper.alterText(req.body.text, req.body.mod),
    number: req.body.number
  });
  newMessage.save(function(err, newMessage) {
  	if (err) {
        res.status(500).send(err);
    } else {
        res.status(200).send(newMessage);
    }
  });
})


//Server init to listen on port 3000 -> Needs to be altered for deployment
app.listen(port)
console.log('Greenfield server running on :3000');
