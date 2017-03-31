const express = require('express');
const router = express.Router();
const RatingField = require('../../../../models/RatingField');

router.get('/', (req, res) => {
  RatingField.find({}, (err, doc) => {
    let fields = [];
    if (doc.length !== 0) {
      fields = doc.map(item => {
        return {
          id: item.id,
          name: item.name
        };
      });
    }
    res.status(200).json({ fields });
  });
});

router.post('/', (req, res) => {
  const ratingField = new RatingField({
    name: req.body.text
  });
  ratingField.save((err, doc) => {
    if (!err) {
      res.status(200).json({
        id: ratingField.id,
        name: ratingField.name
      });
    } else {
      res.sendStatus(203);
    }
  });
});

router.delete('/:fieldId', (req, res) => {
  RatingField.remove({
    _id: req.params.fieldId
  }, (err) => {
    if (!err) {
      res.sendStatus(200);
    } else {
      res.sendStatus(203);
    }
  });
});

module.exports = router;