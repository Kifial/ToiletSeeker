const express = require('express');
const router = express.Router();
const Place = require('../../../models/Place');
const Comment = require('../../../models/Comment');

router.get('/', (req, res) => {
  Place.find({}, (err, doc) => {
    if (!err) {
      let queryPromise,
        queryPromises = [],
        commentRating,
        placeRating,
        placeWithRating,
        placesWithRating = [];
      doc.forEach(item => {
        queryPromise = Comment.find({
          place: item.id
        });
        queryPromises.push(queryPromise);
        placeWithRating = {
          id: item.id,
          name: item.name,
          tags: item.tags,
          vicinity: item.vicinity
        };
        placesWithRating.push(placeWithRating);
      });
      Promise.all(queryPromises)
        .then(places => {
          places.forEach((place, i) => {
            placeRating = 0;
            place.forEach(comments => {
              commentRating = 0;
              comments.ratingFields.forEach(ratingField => {
                commentRating += ratingField.value;
              });
              commentRating /= comments.ratingFields.length;
              placeRating += commentRating;
            });
            placeRating /= place.length;
            placesWithRating[i].rating = placeRating;
          });
          console.log(placesWithRating);
        })
    }
  });
});

module.exports = router;