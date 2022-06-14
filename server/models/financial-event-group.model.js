const mongoose = require('mongoose');

const FinancialEventGroupSchema = new mongoose.Schema(
  {
    marketId: String,
    financialEventGroupStart: String,
    financialEventGroupEnd: String,
    transferStandardDate: String,
    originalAmount: String,
    originalCode: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'FinancialEventGroup',
  FinancialEventGroupSchema
);
