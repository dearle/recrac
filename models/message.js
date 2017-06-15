var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  event: String
  //Add timestamp
});

module.exports = mongoose.model('Message', messageSchema);

