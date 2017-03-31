const express = require('express');
const router = express.Router();
const protectedRoutes = require('./protected');
const authRoutes = require('./auth');

router.use('/protected', protectedRoutes);
router.use('/auth', authRoutes);

module.exports = router;