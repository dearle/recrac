var mongoose = require('mongoose');

//ObjectId.getTimestamp()
var messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  event: String
});

module.exports = mongoose.model('Message', messageSchema);

