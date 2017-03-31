const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: String,
  creator: String,
  date: String,
  likes: [String],
  dislikes: [String],
  place: mongoose.Schema.Types.ObjectId,
  ratingFields: [{
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    value: Number
  }]
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;