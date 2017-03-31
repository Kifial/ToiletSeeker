const express = require('express');
const router = express.Router();
const commentsRoutes = require('./comments');
const placesRoutes = require('./places');
const usersRoutes = require('./users');
const adminRoutes = require('./admin');

router.use('/comments', commentsRoutes);
router.use('/places', placesRoutes);
router.use('/users', usersRoutes);
router.use('/admin', adminRoutes);

module.exports = router;