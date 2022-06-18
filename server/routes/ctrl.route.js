const express = require('express');
const cronjobCtrl = require('../controllers/cronjob.controller');

const router = express.Router();
module.exports = router;

router.get('/cronjob/start', (req, res) =>
  cronjobCtrl.cronjob().then(() => res.send('job started.'))
);

router.get('/histroy-order', (req, res) => res.send('Nothing happened yet.'));
