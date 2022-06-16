const moment = require('moment');
const { apiRequest } = require('./apiRequest');
const orderCtrl = require('../../controllers/order.controller');

const updateOrdersLast = async (time, timeUnit) => {
  const endpoint = '/api/v2/channel/order';
  let startDay = moment()
    .subtract(time, timeUnit)
    .format('YYYY-MM-DD hh:mm:ss');
  let endDay = moment().format('YYYY-MM-DD hh:mm:ss');
  const query = {
    page: 1,
    pagesize: 500,
    lastUpdateStartDate: startDay,
    lastUpdateEndDate: endDay,
  };
  let totalPages = 1;
  do {
    const res = await apiRequest(endpoint, query);
    if (res && res.data && res.data.code === 200) {
      const orderCount = res.data.data.total;
      const orders = res.data.data.rows;
      totalPages = Math.ceil(orderCount / query.pagesize);
      console.log(orderCount);
      console.log(query.page);
      orders.forEach(element => {
        orderCtrl.updateOrInsert(element);
      });
      query.page = query.page + 1;
    } else {
      // no response, error occured.
      break;
    }
  } while (query.page <= totalPages);
};

const updateOrderDetail = async (orderId, marketId) => {
  const endpoint = '/api/v2/channel/order/orderDetail';
  const query = {
    orderId: orderId,
    marketId: marketId,
  };
  const res = await apiRequest(endpoint, query);
  console.log(JSON.stringify(res.data.data));
};

module.exports = {
  updateOrdersLast,
  updateOrderDetail,
};

// (async () => await updateOrderDetail("111-1155935-7028218", "6"))();
// (async () => await updateOrdersLast(90, 'Days'))();
