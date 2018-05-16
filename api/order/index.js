const express = require('express');
const router = express.Router();

//Services
const orderService = require('../../core/order')

router.post('/', function (req, res, next) {
    const packages = req.body;
    const order = orderService.makeOrder(packages);

    const save = orderService.saveOrder(order);

    if (save) res.send(order);
    else res.send(save);

});

router.get('/', function (req, res, next) {
    orderService.getOrders()
    .then(orders => {
        res.send(orders);
    })
});

module.exports = router;