const express = require('express');
const router = express.Router();

//Services
const orderService = require('../../services/order')

router.post('/', function (req, res, next) {
    const packages = req.body;
    orderService.makeOrder(packages, (err, orders) => {
        if (err) {
            res.send(err);
            return;
        }
        orderService.saveOrder(orders);
        
        res.send(orders);
    });
});

router.get('/', function (req, res, next) {
    orderService.getOrders()
        .then(orders => {
            res.send(orders);
        })
});

module.exports = router;