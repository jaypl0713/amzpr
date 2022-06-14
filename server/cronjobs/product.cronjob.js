const product = require('../data-collector/gplus/product');

module.exports = function (agenda) {
  agenda.define('update products', async job => {
    await product.updateProducts();
  });
};
