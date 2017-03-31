const express = require('express');
const router = express.Router({ mergeParams: true });
const Comment = require('../../../models/Comment');

router.patch('/', (req, res) => {
  Comment.update({
    _id: req.params.commentId
  }, {
    $push: { dislikes: req.user.login }
  }, (err, doc) => {
    if (!err) {
      res.status(200).json({
        id: req.params.commentId,
        user: req.user.login
      });
    }
  });
});

router.delete('/', (req, res) => {
  Comment.update({
    _id: req.params.commentId
  }, {
    $pull: { dislikes: req.user.login }
  }, (err, doc) => {
    if (!err) {
      res.status(200).json({
        id: req.params.commentId,
        user: req.user.login
      });
    }
  });
});

module.exports = router;