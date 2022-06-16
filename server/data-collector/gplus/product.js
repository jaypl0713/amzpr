const { apiRequest } = require('./apiRequest');
const productCtrl = require('../../controllers/product.controller');

const updateProducts = async () => {
  const endpoint = '/api/v2/product/product';
  const query = {
    page: 1,
    pagesize: 500,
    sort: 'lastDate',
    order: 'descend',
  };
  let totalPages = 1;
  do {
    const res = await apiRequest(endpoint, query);
    if (res && res.data && res.data.code === 200) {
      const productCount = res.data.data.total;
      const products = res.data.data.rows;
      totalPages = Math.ceil(productCount / query.pagesize);
      console.log(productCount);
      console.log(query.page);
      products.forEach(element => {
        productCtrl.updateOrInsert(element);
      });
      query.page = query.page + 1;
    } else {
      // no response, error occured.
      break;
    }
  } while (query.page <= totalPages);
};

// (async () => await updateProducts())();
module.exports = {
  updateProducts,
};
