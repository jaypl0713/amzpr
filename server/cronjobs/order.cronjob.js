const order = require('../data-collector/gplus/order');

module.exports = function (agenda) {
  agenda.define('update orders last 24 hours', async job => {
    await order.updateOrdersLast(24, 'hours');
  });
  agenda.define('update orders last 12 hours', async job => {
    await order.updateOrdersLast(12, 'hours');
  });
  agenda.define('update orders last 4 hours', async job => {
    await order.updateOrdersLast(4, 'hours');
  });
  agenda.define('update orders last 1 hour', async job => {
    await order.updateOrdersLast(1, 'hours');
  });
  // agenda.define("update order detail", async(job) => {
  //   await order.updateOrderDetail("112-7281712-1043444", "1");
  // });
};
