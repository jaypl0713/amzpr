const express = require('express');
const passport = require('passport');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const marketRoutes = require('./market.route');
const ctrlRoutes = require('./ctrl.route');
const aaaAssistantRoutes = require('./aaa-assistant.route');
const aaaCronjobRoutes = require('./aaa-cronjob.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get(
  '/health-check',
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/markets', marketRoutes);
router.use('/ctrl', ctrlRoutes);
router.use('/aaa-assistant', aaaAssistantRoutes);
router.use('/aaa-cronjob', aaaCronjobRoutes);

module.exports = router;
