const Market = require('../models/market.model');

module.exports = {
  findAll,
  findBy,
  create,
  updateOrInsert,
};

async function findAll() {
  return await Market.find({});
}

async function findBy(sellerId) {
  return await Market.find({
    sellerId: sellerId,
  });
}

async function create(market) {
  return await new Market(market).save();
}

async function updateOrInsert(market) {
  const conditions = {
    sellerId: market.sellerId,
    areaId: market.areaId,
  };
  const update = market;
  const options = {
    upsert: true,
  };
  return await Market.findOneAndUpdate(conditions, update, options);
}
