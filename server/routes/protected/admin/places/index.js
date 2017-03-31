const express = require('express');
const router = express.Router();
const Place = require('../../../../models/Place');
const Comment = require('../../../../models/Comment');
const pagesRoutes = require('./pages');

router.use('/pages', pagesRoutes);

router.get('/', (req, res) => {
  Place.find({}, (err, doc) => {
    let places = [];
    if (doc.length !== 0) {
      places = doc.map(item => {
        return {
          id: item.id,
          name: item.name,
          coords: `${item.coords.lat} ${item.coords.lng}`,
          vicinity: item.vicinity,
          creator: item.creator
        };
      });
    }
    res.status(200).json({ places });
  });
});

router.delete('/:placeId', (req, res) => {
  Place.remove({
    _id: req.params.placeId
  }, (err) => {
    if (!err) {
      Comment.remove({
        place: req.params.placeId
      }, (err) => {
        if (!err) {
          res.sendStatus(200);
        }
      });
    }
  })
});

module.exports = router;