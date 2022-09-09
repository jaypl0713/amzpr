const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const Job = require('../models/aaa-cronjob.model');
const assistantCtrl = require('../controllers/aaa-assistant.controller');

module.exports = {
  findAll,
  findBy,
  create,
  update,
};

async function findAll() {
  return await Job.find({});
}

async function findBy(job) {
  const query = {};
  if (job.assistantId) {
    query.assistantId = job.assistantId;
  }
  if (job.market) {
    query.market = job.market;
  }
  if (job.type) {
    query.type = job.type;
  }
  const jobList = await Job.find(query);
  if (jobList && jobList.length) {
    jobList.forEach(job => {
      if (
        job.status == 1 &&
        moment() - moment(job.nextRunAt, 'YYYY-MM-DD HH:mm:ss') > 0
      ) {
        job.status = 2;
        job.save();
      }
    });
    return jobList;
  }
  // no job found.
  return null;
}

async function create(job) {
  if (job.assistantId && job.market && job.type) {
    job.id = uuidv4();
    if (!job.status) job.status = 0;
    return await new Job(job).save();
  } else {
    return null;
  }
}

async function update(job) {
  if (job && job.assistantId && job.type && job.market) {
    const old = await Job.find({
      assistantId: job.assistantId,
      type: job.type,
      market: job.market,
    });
    if (old) {
      const conditions = {
        assistantId: job.assistantId,
        type: job.type,
        market: job.market,
      };
      const update = job;
      const options = {
        new: true,
      };
      return await Job.findOneAndUpdate(conditions, update, options);
    } else {
      return null;
    }
  } else {
    return null;
  }
}
