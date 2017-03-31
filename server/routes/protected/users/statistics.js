const express = require('express');
const router = express.Router({ mergeParams: true });
const Place = require('../../../models/Place');
const setCurrentDate = require('../../../actions/setCurrentDate');

router.get('/', (req, res) => {
  new Promise((resolve, reject) => {
    const response = {
      items: []
    };
    getAllCheckIns(response, req.user.login, resolve);
  })
    .then(data => {
      return getMostCheckInsInOnePlace(data, req.user.login);
    })
    .then(data => {
      return getPlacesYouVisitedCount(data, req.user.login);
    })
    .then(data => {
      return getMostVisitsInOneDay(data, req.user.login);
    })
    .then(data => {
      return getPlacesYouVisitedMoreThanOthers(data, req.user.login);
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
    });
});

function getAllCheckIns(response, login, resolve) {
  Place.find({
    'checkIns.user': login
  }, (err, doc) => {
    let sum = 0,
      matchItems = [];
    if (doc.length !== 0) {
      doc.forEach(item => {
        matchItems = item.checkIns.filter(checkIn => {
          if (checkIn.user === login) {
            return true
          } else {
            return false;
          }
        });
        sum += matchItems.length;
      });
    }
    response.items.push({
      number: sum,
      text: 'Amount of check-ins you did'
    });
    resolve(response);
  });
}

function getMostCheckInsInOnePlace(response, login) {
  return new Promise((resolve, reject) => {
    Place.find({
      'checkIns.user': login
    }, (err, doc) => {
      let checkIns, maxCheckIns = 0;
      if (doc.length !== 0) {
        doc.forEach(item => {
          checkIns = 0;
          item.checkIns.forEach(checkIn => {
            if (checkIn.user === login) {
              checkIns += 1;
            }
          });
          if (maxCheckIns < checkIns) {
            maxCheckIns = checkIns;
          }
        });
      }
      response.items.push({
        number: maxCheckIns,
        text: 'Times you visited one place'
      });
      resolve(response);
    });
  });
}

function getPlacesYouVisitedCount(response, login) {
  return new Promise((resolve, reject) => {
    Place.find({
      'checkIns.user': login
    }, (err, doc) => {
      response.items.push({
        number: doc.length,
        text: 'Different places you visited'
      });
      resolve(response);
    });
  });
}

function getMostVisitsInOneDay(response, login) {
  return new Promise((resolve, reject) => {
    Place.find({
      'checkIns.user': login
    }, (err, doc) => {
      let checkInsByDay = {},
        maxCheckIns = 0,
        date;
      if (doc.length !== 0) {
        doc.forEach(item => {
          item.checkIns.forEach(checkIn => {
            if (checkIn.user === login) {
              date = setCurrentDate(new Date(checkIn.time));
              if (checkInsByDay.hasOwnProperty(date)) {
                checkInsByDay[date] += 1;
              } else {
                checkInsByDay[date] = 1;
              }
            }
          });
        });
        for (let date in checkInsByDay) {
          if (checkInsByDay.hasOwnProperty(date)) {
            if (checkInsByDay[date] > maxCheckIns) {
              maxCheckIns = checkInsByDay[date];
            }
          }
        }
      }
      response.items.push({
        number: maxCheckIns,
        text: 'Times you visited different places in single day'
      });
      resolve(response);
    });
  });
}

function getPlacesYouVisitedMoreThanOthers(response, login) {
  return new Promise((resolve, reject) => {
    Place.find({
      'checkIns.user': login
    }, (err, doc) => {
      let places = [],
        placeMaxVisits,
        placeVisitors,
        isUserHasMore;
      if (doc.length !== 0) {
        doc.forEach(item => {
          placeVisitors = {};
          placeMaxVisits = 0;
          isUserHasMore = true;
          item.checkIns.forEach(checkIn => {
            if (placeVisitors.hasOwnProperty(checkIn.user)) {
              placeVisitors[checkIn.user] += 1;
            } else {
              placeVisitors[checkIn.user] = 1;
            }
          });
          for (let user in placeVisitors) {
            if (placeVisitors.hasOwnProperty(user)) {
              if (placeVisitors[user] > placeVisitors[login]) {
                isUserHasMore = false;
                break;
              }
            }
          }
          if (isUserHasMore) {
            places.push(item);
          }
        });
      }
      response.items.push({
        number: places.length,
        text: 'You were more times in the place than other people'
      });
      resolve(response);
    });
  });
}

module.exports = router;