const express = require('express');
const router = express.Router({ mergeParams: true });
const Place = require('../../../models/Place');

router.patch('/', (req, res) => {
  let time = new Date(),
    convertedTime;
  Place.findById(req.params.placeId, (err, doc) => {
    if (!err) {
      doc.checkIns.push({
        user: req.user.login,
        time: time.getTime()
      });
      doc.save((err) => {
        if (!err) {
          convertedTime = convertTime(time, doc.name);
          res.status(200).json({ time: convertedTime });
        }
      });
    }
  });
});

function convertTime(time, name) {
  let day,
    month,
    hours,
    minutes;
  day = time.getDate();
  month = time.getMonth() + 1;
  if (`${month}`.length === 1) {
    month = '0' + month;
  }
  hours = time.getHours();
  minutes = time.getMinutes();
  return `You checked-in ${day}.${month} at ${hours}:${minutes} in ${name}`;
}

module.exports = router;