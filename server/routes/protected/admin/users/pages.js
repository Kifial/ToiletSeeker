const express = require('express');
const router = express.Router();
const User = require('../../../../models/User');
const getPaginationArray = require('../../../../actions/getPaginationArray');
const itemsPerPage = 2;

router.get('/:page', (req, res) => {
  let itemsCount = 0,
    pagesCount = 0;
  User.count({
    deleted: false
  }, (err, count) => {
    itemsCount = count;
    pagesCount = itemsCount / itemsPerPage;
    if (pagesCount - Math.floor(pagesCount) > 0) {
      pagesCount = Math.floor(pagesCount) + 1;
    }
    User.find({
      deleted: false
    }).skip(itemsPerPage * (req.params.page - 1)).limit(itemsPerPage).then(doc => {
      let users = [];
      if (doc.length !== 0) {
        users = doc.map(item => {
          return {
            id: item.id,
            login: item.login,
            name: item.name,
            info: item.info
          };
        });
      }
      res.status(200).json({
        page: +req.params.page,
        pagination: getPaginationArray(+req.params.page, pagesCount),
        pagesCount,
        users
      });
    });
  });
});

module.exports = router;