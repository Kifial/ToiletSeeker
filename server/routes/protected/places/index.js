const express = require('express');
const router = express.Router();
const Place = require('../../../models/Place');
const User = require('../../../models/User');
const RatingField = require('../../../models/RatingField');
const Comment = require('../../../models/Comment');
const checkInRoutes = require('./checkIn');
const ratingRoutes = require('./rating');

router.use('/:placeId/checkin', checkInRoutes);
router.use('/rating', ratingRoutes);

router.get('/', (req, res) => {
  Place.find({}, (err, doc) => {
    if (doc !== null) {
      let markers = doc.map(item => {
        return {
          id: item.id,
          name: item.name,
          tags: item.tags,
          coords: item.coords,
          creator: item.creator,
          vicinity: item.vicinity
        };
      });
      res.status(200).json({
        markers
      });
    } else {
      res.sendStatus(204);
    }
  });
});

router.post('/', (req, res) => {
  User.findOne({
    login: req.user.login
  }, (err, doc) => {
    if (doc !== null) {
      const marker = new Place({
        name: req.body.name,
        tags: req.body.tags,
        coords: req.body.coords,
        creator: req.user.login,
        vicinity: req.body.vicinity,
        checkIns: []
      });
      marker.save(() => {
        res.status(200).json({
          id: marker.id,
          name: marker.name,
          tags: marker.tags,
          coords: marker.coords,
          creator: marker.creator,
          vicinity: marker.vicinity
        });
      });
    } else {
      res.sendStatus(204);
    }
  });
});

router.get('/:placeId', (req, res) => {
  Place.findById(req.params.placeId, (err, doc) => {
    let place;
    if (doc !== null) {
      place = {
        login: req.user.login,
        id: doc.id,
        name: doc.name,
        tags: doc.tags,
        vicinity: doc.vicinity,
        comments: [],
        ratingFields: [],
        coords: doc.coords
      };
      RatingField.find({}, (err, doc) => {
        if (doc.length !== 0) {
          place.ratingFields = doc.map(item => {
            return {
              id: item.id,
              name: item.name
            };
          });
        }
        Comment.find({
          place: place.id
        }, (err, doc) => {
          if (doc.length !== 0) {
            let queryPromise,
              queryPromises = [],
              rating = 0,
              ratingFieldsCount = 0;
            place.comments = doc.map(item => {
              let liked = false,
                disliked = false;
              item.ratingFields.forEach(field => {
                rating += field.value;
                ratingFieldsCount += 1;
              });
              item.likes.forEach(user => {
                if (user === req.user.login) {
                  liked = true;
                }
              });
              if (!liked) {
                item.dislikes.forEach(user => {
                  if (user === req.user.login) {
                    disliked = true;
                  }
                });
              }
              return {
                id: item.id,
                text: item.text,
                likes: item.likes.length,
                dislikes: item.dislikes.length,
                date: item.date,
                creator: item.creator,
                ratingFields: item.ratingFields,
                disliked,
                liked
              };
            });
            place.rating = (rating / ratingFieldsCount).toFixed(2);
            place.comments.forEach(item => {
              queryPromise = User.findOne({
                login: item.creator
              });
              queryPromises.push(queryPromise);
            });
            Promise.all(queryPromises)
              .then(arrayOfResults => {
                arrayOfResults.forEach((item, i) => {
                  place.comments[i].avatar = item.avatar;
                  place.comments[i].name = item.name;
                });
                res.status(200).json(place);
              });
          } else {
            res.status(200).json(place);
          }
        });
      });
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;