const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const fs = require('fs');
const path = require('path');
const os = require('os');
const Busboy = require('busboy');
const EventEmitter = require('events').EventEmitter;
const lwip = require('lwip');
const assetsPath = require('../../../config').assetsPath;
const avatarPlaceholder = require('../../../config').avatarPlaceholder;
const uuid = require('uuid');
const statisticsRoutes = require('./statistics');

router.use('/:userLogin/statistics', statisticsRoutes);

router.get('/:userLogin', (req, res) => {
  User.findOne({
    login: req.user.login
  }, (err, doc) => {
    if (doc !== null) {
      res.status(200).json({
        name: doc.name,
        login: doc.login,
        info: doc.info,
        profileAvatar: doc.profileAvatar
      });
    } else {
      res.sendStatus(404);
    }
  });
});

router.put('/:userLogin', (req, res) => {
  let sourceImageName,
    profileImageName,
    avatarName,
    fileType,
    userName,
    userInfo;
  const ee = new EventEmitter();
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename) => {
    sourceImageName = filename;
    let splittedFileName = sourceImageName.split('.');
    fileType = splittedFileName[splittedFileName.length - 1];
    sourceImageName = uuid.v4();
    file.pipe(fs.createWriteStream(path.resolve(assetsPath, `${sourceImageName}.${fileType}`)));
  });
  busboy.on('field', (fieldname, val) => {
    switch(fieldname) {
      case 'name':
        userName = val;
        break;
      case 'info':
        userInfo = val;
        break;
      default:
        break;
    }
  });
  busboy.on('finish', () => {
    if (sourceImageName) {
      User.findOne({
        login: req.user.login
      }, (err, doc) => {
        if (doc !== null) {
          let imagePath = '';
          if (doc.profileAvatar !== ('/assets/' + avatarPlaceholder)) {
            imagePath = doc.profileAvatar.split('/');
            imagePath = imagePath[imagePath.length - 1];
            fs.unlinkSync(path.resolve(assetsPath, imagePath));
          }
          if (doc.avatar !== ('/assets/' + avatarPlaceholder)) {
            imagePath = doc.avatar.split('/');
            imagePath = imagePath[imagePath.length - 1];
            fs.unlinkSync(path.resolve(assetsPath, imagePath));
          }
        }
        ee.emit('resizeToProfileAvatar');
      });
    } else {
      ee.emit('noImage');
    }
  });
  ee.once('resizeToProfileAvatar', () => {
    lwip.open(path.resolve(assetsPath, `${sourceImageName}.${fileType}`), (err, image) => {
      let imageScale = 180 / image.height();
      profileImageName = uuid.v4();
      image.batch()
        .scale(imageScale)
        .crop(180, 180)
        .writeFile(path.resolve(assetsPath, `${profileImageName}.${fileType}`), (err) => {
          if (!err) {
            ee.emit('resizeToAvatar', profileImageName);
          } else {
            res.sendStatus(203);
          }
        })
    });
  });
  ee.once('resizeToAvatar', (imageName) => {
    fs.unlinkSync(path.resolve(assetsPath, `${sourceImageName}.${fileType}`));
    lwip.open(path.resolve(assetsPath, `${imageName}.${fileType}`), (err, image) => {
      let imageScale = 42 / image.height();
      avatarName = uuid.v4();
      image.batch()
        .scale(imageScale)
        .writeFile(path.resolve(assetsPath, `${avatarName}.${fileType}`), (err) => {
          if (!err) {
            User.updateOne({
              login: req.user.login
            }, {
              $set: {
                profileAvatar: `/assets/${profileImageName}.${fileType}`,
                avatar: `/assets/${avatarName}.${fileType}`,
                name: userName,
                info: userInfo
              }
            }, (err, result) => {
              if (!err) {
                res.sendStatus(200);
              } else {
                res.sendStatus(203);
              }
            });
          } else {
            res.sendStatus(203);
          }
        })
    });
  });
  ee.once('noImage', () => {
    User.updateOne({
      login: req.user.login
    }, {
      $set: {
        name: userName,
        info: userInfo
      }
    }, (err, doc) => {
      if (!err) {
        res.sendStatus(200);
      } else {
        res.sendStatus(203);
      }
    });
  });
  req.pipe(busboy);
});

module.exports = router;