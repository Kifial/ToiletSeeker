const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const avatarPlaceholder = require('../../config').avatarPlaceholder;
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config').jwtSecret;
const expressJWT = require('express-jwt');

router.get('/', expressJWT({ secret: jwtSecret }), (req, res) => {
  User.findOne({
    login: req.user.login
  }, (err, doc) => {
    if (doc !== null) {
      res.status(200).json({ login: req.user.login });
    } else {
      res.sendStatus(202);
    }
  });
});

router.post('/registration', (req, res) => {
  User.findOne({
    login: req.body.login
  }, (err, doc) => {
    if (doc === null) {
      const user = new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.login,
        info: 'edit user info',
        avatar: '/assets/' + avatarPlaceholder,
        profileAvatar: '/assets/' + avatarPlaceholder
      });
      user.save(() => {
        const token = jwt.sign({ login: req.body.login }, jwtSecret);
        res.status(200).json({ token, login: req.body.login });
      });
    } else {
      res.sendStatus(202);
    }
  });
});s
sa
router.post('/login', (req, res) => {
  User.findOne({
    login: req.body.login,
    password: req.body.password,
    deleted: false
  }, (err, doc) => {
    if (doc !== null) {
      const token = jwt.sign({ login: req.body.login }, jwtSecret);
      res.status(200).json({ token, login: req.body.login });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;