const mongoose = require('mongoose');

const AssistantSchema = new mongoose.Schema(
  {
    name: String,
    sellerId: String,
    code: String,
    markets: String,
    token: String,
    nextRunAt: String,
    lastRunAt: String,
    lastFinishedAt: String,
    FailedAt: String,
    failReason: String,
    failCount: Number,
    healthCheckAt: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AAAssistant', AssistantSchema);
