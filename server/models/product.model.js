const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    state: String,
    sku: String,
    erpProductId: String,
    name: String,
    brand: String,
    brandName: String,
    unit: String,
    category: String,
    categoryName: String,
    productDeliveryDays: Number,
    packageH: Number,
    packageL: Number,
    packageW: Number,
    productTypeName: String,
    specification: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
