const mongoose = require('mongoose');

const ratingFieldSchema = mongoose.Schema({
  name: String
});

const RatingField = mongoose.model('RatingField', ratingFieldSchema);

module.exports = RatingField;