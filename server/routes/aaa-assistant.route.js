const express = require('express');
const moment = require('moment');
const aaaAssistantCtrl = require('../controllers/aaa-assistant.controller');
const aaaCronjobCtrl = require('../controllers/aaa-cronjob.controller');
const router = express.Router();
module.exports = router;

router.post('/reg', reg);
router.post('/q', findBy);
router.post('/ping', ping);

function findBy(req, res) {
  aaaAssistantCtrl
    .findBy(req.body)
    .then(assistantList => res.send(assistantList))
    .catch(err => console.log(err));
}

function reg(req, res) {
  aaaAssistantCtrl.reg(req.body).then(assistant => {
    if (assistant) {
      res.send('Contact sysadmin for token.');
    } else {
      res.send('The assistant could not be created.');
    }
  });
}

function ping(req, res) {
  const token = req.body.token;
  if (token) {
    aaaAssistantCtrl
      .update({
        token: token,
        healthCheckAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      })
      .then(assistant => {
        if (assistant && assistant.token) {
          return aaaCronjobCtrl.findBy(assistant.token);
        } else {
          return null;
        }
      })
      .then(aaaCronjobs => {
        if (aaaCronjobs) {
          res.send(aaaCronjobs);
        } else {
          res.send('..');
        }
      })
      .catch(err => res.send(err));
  } else {
    res.send('...');
  }
}
