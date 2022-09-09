const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/aaa-payment.model');

module.exports = {
  findAll,
  findBy,
  create,
  updateOrInsert,
};

async function findAll() {
  return await Payment.find({});
}

async function findBy(sellerId, market, runDate) {
  const query = {};
  if (sellerId) {
    query.sellerId = sellerId;
  }
  if (market) {
    query.market = market;
  }
  if (runDate) {
    query.runDate = runDate;
  }
  return await Payment.find(query);
}

async function create(payment) {
  payment.id = uuidv4();
  return await new Payment(payment).save();
}

async function updateOrInsert(payment) {
  const conditions = {
    id: payment.id,
  };
  const update = payment;
  const options = {
    upsert: true,
  };
  return await Payment.findOneAndUpdate(conditions, update, options);
}
