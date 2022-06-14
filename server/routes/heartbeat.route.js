const express = require('express');
const cronjobCtrl = require('../controllers/cronjob.controller');

const router = express.Router();
module.exports = router;

router.get('/', (req, res) => cronjobCtrl.cronjob());
