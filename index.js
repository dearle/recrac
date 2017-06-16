                             ///////////////////////////
                            // Server intialization. //
                           ///////////////////////////

 
 /////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Requirements //////////////////////////////////////


// Basic requirements for express and to indicate paths
const express = require('express')
const path = require('path')

// Middleware to produce response bodies
const bodyParser = require('body-parser');

// Needed for facebook passport authentication
const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;

// Needed to instantiate sessions and parse them for use
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Includes the use of flash text to inform user of success or failure of action
const flash = require('connect-flash');

// Includes all required API keys and variables required for use of said API's
const config = require('./config/config.js');

// Includes and calls database initialization
const db = require('./db')

// Require if modular code is put in helper:
// Includes helpers that modularize our code
//const helper = require('./helpers/helper');

// Includes all our models for our database to make use of
var Message = require('./models/message');
var User = require('./models/user');
var Event = require('./models/event');

// Creates a variable which holds the port being used either the one given by Cloud Application Platform 
// (Heroku) through an environment variable or local 3000
const port = process.env.PORT || 3000;

 ////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


 ///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Create Server + Run middleware //////////////////////////////// 


// Initialize our express server called app
const app = express()

// Initialize cookie parser to parse session data and cookies must happen before initializing session
app.use(cookieParser());

// Initialize session data:
  // Secret is used to hash the session so that it can't be hijacked
  // Resave set to true prevents session from being deleted at the wrong time
  // SaveUnitialized set to false will prevent empty/unauthenticated sessions from being saved
app.use(session({secret: 'recursive raccoon', resave: true, saveUninitialized: false}));

//passport authentication///////////////////////////////Not sure
app.use(passport.initialize());
app.use(passport.session());

// Intializing the flash middleware to attach to sessions (fb and express) and flash messages to user
// at success or failure of authentication actions 
app.use(flash());

// Middleware to parse body such that request.body can be used to parse request objects
// arriving from the client side 
app.use(bodyParser.json());

//Paths to look for files to import, connect and load to the server (can have many/more than one)
app.use(express.static(path.resolve(__dirname, './home')))


 ////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////




//Passport facebook strategy config:

passport.use(new facebookStrategy({
    clientID: config.FACEBOOK_APP_ID, 
    clientSecret:  config.FACEBOOK_APP_SECRET, 
    callbackURL: "https://recrac.herokuapp.com/auth/facebook/callback",

    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('this is the facebook returned profile', profile)
    User.findOne({
      'facebook.id':profile.id
    }, function(err, user) {
      if (err) {
        console.error(err)
        return done(error)
      }
      if (!user) {
        console.log("new user created");
        user = new User({
          user: profile.displayName,
          picture: profile.photos[0].value,
          email: profile.email,
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
  console.log("serialize user: ", user);
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

app.get('/', require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
  res.render('home', {user: req.user});
});

app.get('/login', function(req, res) {
  res.render('login');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/home',
                                      failureRedirect: '/login',
                                      failureFlash: true,
                                      successFlash: 'Welcome!' }));

app.get('/events', 
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('events', { user: req.user});
  } )

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
//here is a change.
