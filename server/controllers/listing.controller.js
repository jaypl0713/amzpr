const Listing = require('../models/listing.model');

module.exports = {
  findAll,
  findBy,
  create,
  updateOrInsert,
};

async function findAll() {
  return await Listing.find({});
}

async function findBy(conditions) {
  return await Listing.find(conditions);
}

async function create(listing) {
  return await new Listing(listing).save();
}

async function updateOrInsert(listing) {
  const conditions = {
    marketId: listing.marketId,
    asin: listing.asin,
    sellerSku: listing.sellerSku,
  };
  const options = {
    upsert: true,
  };
  return await Listing.findOneAndUpdate(conditions, listing, options);
}
