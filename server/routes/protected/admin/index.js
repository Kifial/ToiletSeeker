const express = require('express');
const router = express.Router();
const placesRoutes = require('./places/index');
const usersRoutes = require('./users/index');
const ratingFieldsRoutes = require('./ratingFields/index');

router.use('/places', placesRoutes);
router.use('/users', usersRoutes);
router.use('/ratingFields', ratingFieldsRoutes);

module.exports = router;