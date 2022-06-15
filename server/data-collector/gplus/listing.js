const { apiRequest } = require('./apiRequest');
const listingCtrl = require('../../controllers/listing.controller');

const updateListings = async () => {
  const endpoint = '/api/v2/channel/selling';
  const query = {
    page: 1,
    pagesize: 500,
    sort: 'addDate',
    order: 'ascend',
  };
  let totalPages = 1;
  do {
    const res = await apiRequest(endpoint, query);
    if (res && res.data && res.data.code === 200) {
      const listingCount = res.data.data.total;
      const listings = res.data.data.rows;
      totalPages = Math.ceil(listingCount / query.pagesize);
      console.log(listingCount);
      console.log(query.page);
      listings.forEach(element => {
        listingCtrl.updateOrInsert(element);
      });
      query.page = query.page + 1;
    } else {
      // no response, error occured.
      break;
    }
  } while (query.page <= totalPages);
};

(async () => await updateListings())();
module.exports = {
  updateListings,
};
