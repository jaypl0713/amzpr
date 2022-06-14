const Product = require('../models/product.model');

module.exports = {
  findAll,
  findBy,
  create,
  updateOrInsert,
};

async function findAll() {
  return await Product.find({});
}

async function findBy(conditions) {
  return await Product.find(conditions);
}

async function create(product) {
  return await new Product(product).save();
}

async function updateOrInsert(product) {
  product['erpProductId'] = product.id;

  const conditions = {
    sku: product.sku,
  };
  const options = {
    upsert: true,
  };
  return await Product.findOneAndUpdate(conditions, product, options);
}
