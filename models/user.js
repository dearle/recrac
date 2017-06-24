var mongoose = require('mongoose');
var Promise = require('bluebird');
//Import bcrypt:

var userSchema = new mongoose.Schema({
  user: String,
  picture: String,
  email: String,
  number: String,
  facebook: Object,
  hostedEvents: [String],
  joinedEvents: [String],
  rating: Number
});


module.exports = mongoose.model('User', userSchema);

