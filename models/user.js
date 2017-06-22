var mongoose = require('mongoose');
var Promise = require('bluebird');
//Import bcrypt:

var userSchema = new mongoose.Schema({
  user: String,
  password: String,
  picture: String,
  email: String,
  number: String,
  facebook: Object,
  hostedEvents: String,
  joinedEvents: String,
  rating: Number
});

//To create bcrypted password:
userSchema.pre('save', function(next){
  next();
});

module.exports = mongoose.model('User', userSchema);

