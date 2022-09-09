const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    id: String,
    sellerId: String,
    market: String,
    runDate: String,
    amount: Number,
    totalBalance: Number,
    failReason: String,
    summary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AAAPayment', PaymentSchema);
