const market = require('../data-collector/gplus/market');
module.exports = function (agenda) {
  agenda.define('update markets', async job => {
    await market.updateMarkets();
  });
};
