const express = require('express');
const router = express.Router();
const assetsPath = require('../../../../config').assetsPath;
const fs = require('fs');
const path = require('path');
const User = require('../../../../models/User');
const pagesRoutes = require('./pages');

router.use('/pages', pagesRoutes);

router.get('/', (req, res) => {
  User.find({
    deleted: false
  }, (err, doc) => {
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
    res.status(200).json({ users });
  });
});

router.delete('/:userLogin', (req, res) => {
  User.findOne({
    login: req.params.userLogin
  }, (err, user) => {
    if (user.avatar !== '/assets/avatar-placeholder.png') {
      const avatar = user.avatar.split('/');
      fs.unlinkSync(path.resolve(assetsPath, avatar[avatar.length - 1]));
    }
    user.deleted = true;
    user.avatar = `/assets/deleted-user-avatar.jpg`;
    user.save(() => {
      res.sendStatus(200);
    });
  })
});

module.exports = router;