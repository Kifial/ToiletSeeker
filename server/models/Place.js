const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  name: String,
  tags: String,
  coords: {
    lat: Number,
    lng: Number
  },
  creator: String,
  vicinity: String,
  checkIns: [{
    user: String,
    time: Number
  }]
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;