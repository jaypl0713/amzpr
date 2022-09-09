const { number } = require('joi');
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    id: String,
    assistantId: String,
    market: String,
    type: String,
    status: Number, //0: inited, 1: standby, 2: pending, 3: working, 4: paused, 9: deleted
    interval: Number,
    nextRunAt: String,
    lastRunAt: String,
    lastFinishedAt: String,
    FailedAt: String,
    failReason: String,
    failCount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AAAJob', JobSchema);
