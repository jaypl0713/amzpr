const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema(
  {
    marketId: Number,
    smallImageUrl: String,
    normalImageUrl: String,
    category: String,
    categoryName: String,
    listingTitle: String,
    asin: String,
    variationAsin: String,
    sellerSku: String,
    productName: String,
    product: String,
    adjustStandardPriceAmount: {
      currencySymbol: String,
      currencyAmount: Number,
      currencyCode: String,
    },
    salePriceAmount: {
      currencySymbol: String,
      currencyAmount: Number,
      currencyCode: String,
    },
    trialWarehouseFee: {
      currencySymbol: String,
      currencyAmount: Number,
      currencyCode: String,
    },
    fulfillment: String,
    state: Number,
    averageStar: Number,
    reviewQuantity: String,
    trialWarehouseFee: Number,
    ratingQuantity: {
      type: Object,
      required: true,
    },
    sellersRank: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Listing', ListingSchema);
