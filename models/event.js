var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  host: String,
  type: String,
<<<<<<< HEAD
  location: { address: String, lng: Number, lat: Number },
=======
  location: { type: String, coordinates: [Number] },
>>>>>>> adjusted event db for timestamp
  desiredParticipants: Number,
  time: String,
  price: Number,
  confirmedParticipants: String,
  potentialParticipants: String
  },   
{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Event', eventSchema);

