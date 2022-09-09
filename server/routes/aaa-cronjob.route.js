const express = require('express');
const aaaCronjobCtrl = require('../controllers/aaa-cronjob.controller');
const assistantCtrl = require('../controllers/aaa-assistant.controller');
const router = express.Router();
module.exports = router;

router.post('/q', findBy);
router.post('/set', set);
router.post('/update', update);

function findBy(req, res) {
  aaaCronjobCtrl
    .findBy(req.body)
    .then(cronjobList => res.send(cronjobList))
    .catch(err => console.log(err));
}

function update(req, res) {
  aaaCronjobCtrl
    .update({
      assistantId: req.body.assistantId,
      market: req.body.market,
      type: req.body.type,
      status: req.body.status,
      interval: req.body.interval,
      nextRunAt: req.body.nextRunAt,
    })
    .then(cronjob => res.send(cronjob))
    .catch(err => console.log(err));
}

function set(req, res) {
  if (req.body.assistantId) {
    assistantCtrl
      .findBy({ token: req.body.assistantId })
      .then(assistants => {
        if (assistants && assistants.length) {
          aaaCronjobCtrl
            .findBy(req.body)
            .then(jobList => {
              if (jobList && jobList.length) {
                const job = jobList[0];
                job.status = req.body.status;
                job.interval = req.body.interval;
                job.nextRunAt = req.body.nextRunAt;
                aaaCronjobCtrl.update(job);
                res.send(job);
              } else {
                aaaCronjobCtrl
                  .create(req.body)
                  .then(cronjob => res.send(cronjob))
                  .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  } else {
    res.send('Token needed.');
  }
}
