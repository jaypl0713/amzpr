const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const marketRoutes = require('./market.route');
const ctrlRoutes = require('./ctrl.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/markets', marketRoutes);
router.use('/ctrl', ctrlRoutes);

module.exports = router;
