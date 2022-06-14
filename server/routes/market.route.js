const express = require('express');
const marketCtrl = require('../controllers/market.controller');
const router = express.Router();
module.exports = router;

router.get('/', findAll);
router.post('/', create);
router.get('/:sellerId', findBySellerId);

function findAll(req, res) {
  marketCtrl
    .findAll()
    .then(marketList => {
      res.send(marketList);
    })
    .catch(err => console.log(err));
}

function findBySellerId(req, res) {
  marketCtrl
    .findBy(req.params.sellerId)
    .then(markets => res.send(markets))
    .catch(err => console.log(err));
}

function create(req, res) {
  marketCtrl
    .updateOrInsert(req.body)
    .then(market => res.send(market))
    .catch(err => console.log(err));
}
