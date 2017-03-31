const express = require('express');
const router = express.Router();
const Place = require('../../../../models/Place');
const getPaginationArray = require('../../../../actions/getPaginationArray');
const itemsPerPage = 2;

router.get('/:page', (req, res) => {
  let itemsCount = 0,
    pagesCount = 0;
  Place.count({}, (err, count) => {
    itemsCount = count;
    pagesCount = itemsCount / itemsPerPage;
    if (pagesCount - Math.floor(pagesCount) > 0) {
      pagesCount = Math.floor(pagesCount) + 1;
    }
    Place.find().skip(itemsPerPage * (req.params.page - 1)).limit(itemsPerPage).then(doc => {
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
      res.status(200).json({
        page: +req.params.page,
        pagination: getPaginationArray(+req.params.page, pagesCount),
        pagesCount,
        places
      });
    });
  });
});

module.exports = router;