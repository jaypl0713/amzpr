const Order = require('../models/order.model');

module.exports = {
  findAll,
  findBy,
  create,
  updateOrInsert,
};

async function findAll() {
  return await Order.find({});
}

async function findBy(conditions) {
  return Order.find(conditions);
}

async function create(order) {
  return await new Order(order).save();
}

async function updateOrInsert(order) {
  order['erpOrderId'] = order.id;

  const conditions = {
    orderId: order.orderId,
    marketId: order.marketId,
  };
  let doc = await Order.findOne(conditions);
  if (!doc) {
    doc = await new Order(order).save();
  } else {
    Object.assign(doc, order);
    await doc.save();
  }
  // console.log(doc);
  return doc;
}
