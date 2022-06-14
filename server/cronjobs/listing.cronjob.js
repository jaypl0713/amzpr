const listing = require('../data-collector/gplus/listing');
module.exports = function (agenda) {
  agenda.define('update listings', async job => {
    await listing.updateListings();
  });
};
