const { apiRequest } = require('./apiRequest');
const marketCtrl = require('../../controllers/market.controller');

const updateMarkets = async () => {
  const endpoint = '/api/v2/market/maintain/markets';
  const query = {
    page: 1,
    pagesize: 500,
    sort: 'store',
    order: 'ascend',
  };
  let totalPages = 1;
  do {
    const res = await apiRequest(endpoint, query);
    console.log(res);
    if (res && res.data && res.data.code === 200) {
      const marketCount = res.data.data.total;
      const marketList = res.data.data.rows;
      totalPages = Math.ceil(marketCount / query.pagesize);
      console.log(marketCount);
      console.log(query.page);
      console.log(marketList.length);
      marketList.forEach(element => {
        marketCtrl.updateOrInsert(element);
      });
      query.page = query.page + 1;
    } else {
      // no response, error occured.
      break;
    }
  } while (query.page <= totalPages);
};

// (async () => await updateMarkets())();
module.exports = {
  updateMarkets,
};
