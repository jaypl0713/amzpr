const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    areaId: {
      type: Object,
      required: true,
    },
    marketListVos: [
      {
        marketId: {
          type: String,
          required: true,
        },
        sellerId: {
          type: String,
          required: true,
        },
        store: {
          type: String,
          required: true,
        },
        countryId: {
          type: String,
          required: true,
        },
        market: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Market', marketSchema);
