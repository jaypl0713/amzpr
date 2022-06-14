const order = require('../data-collector/gplus/order');

module.exports = function (agenda) {
  agenda.define('update orders', async job => {
    await order.updateOrders24h();
  });
  // agenda.define("update order detail", async(job) => {
  //   await order.updateOrderDetail("112-7281712-1043444", "1");
  // });
};
