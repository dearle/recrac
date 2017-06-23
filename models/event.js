var mongoose = require('mongoose');
const request = require('request');
const geocodeURL = 'http://maps.google.com/maps/api/geocode/json?address=';

var eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  host: String,
  type: String,
  // location: { type: String, coordinates: [Number] },
  location: { address: String, lng: Number, lat: Number },
  desiredParticipants: Number,
  time: String,
  price: Number,
  confirmedParticipants: String,
  potentialParticipants: String
});

eventSchema.pre('save', function(next){
  request(geocodeURL + this.location.address, (err, response, body) => {
    if (err){
      console.error(err);
    } else {
      var locationObj = JSON.parse(body).results[0];
      this.location.lng = locationObj.geometry.location.lng;
      this.location.lat = locationObj.geometry.location.lat;
      this.location.address = locationObj.formatted_address;
    }
    next();
  });
});

module.exports = mongoose.model('Event', eventSchema);