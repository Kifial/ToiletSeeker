const express = require('express');
const router = express.Router();
const Comment = require('../../../models/Comment');
const User = require('../../../models/User');
const setCurrentDate = require('../../../actions/setCurrentDate');
const likesRoutes = require('./likes');
const dislikesRoutes = require('./dislikes');

router.use('/:commentId/likes', likesRoutes);
router.use('/:commentId/dislikes', dislikesRoutes);

router.get('/', (req, res) => {
  Comment.find({}, (err, doc) => {
    if (!err) {
      res.status(200).json({ doc });
    }
  });
});

router.post('/', (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    creator: req.user.login,
    date: setCurrentDate(new Date()),
    likes: [],
    dislikes: [],
    place: req.body.placeId,
    ratingFields: req.body.ratingFields
  });
  comment.save(() => {
    User.findOne({
      login: comment.creator
    }, (err, doc) => {
      let avatar,
        name;
      if (doc !== null) {
        avatar = doc.avatar;
        name = doc.name;
      }
      res.status(200).json({
        id: comment.id,
        text: comment.text,
        creator: comment.creator,
        likes: comment.likes.length,
        dislikes: comment.dislikes.length,
        date: comment.date,
        avatar,
        name,
        liked: false,
        disliked: false,
        ratingFields: comment.ratingFields
      });
    });
  });
});

router.get('/:commentId', (req, res) => {
  Comment.findById(req.params.commentId, (err, doc) => {
    if (!err) {
      res.status(200).json(doc);
    }
  })
});

router.delete('/:commentId', (req, res) => {
  Comment.remove({
    _id: req.params.commentId
  }, (err) => {
    if (!err) {
      res.sendStatus(200);
    } else {
      res.sendStatus(203);
    }
  })
});

module.exports = router;