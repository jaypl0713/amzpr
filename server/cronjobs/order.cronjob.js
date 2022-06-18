const config = require('../config/config');
const orderCollector = require('../data-collector/gplus/order');

module.exports = function (agenda) {
  const offset = config.timezoneOffset;
  agenda.define('update orders last 24 hours', async job => {
    orderCollector.updateHistoryOrdersByHours(24, offset);
  });
  agenda.define('update orders last 12 hours', async job => {
    orderCollector.updateHistoryOrdersByHours(12, offset);
  });
};
