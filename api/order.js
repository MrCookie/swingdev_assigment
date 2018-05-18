const express = require('express');
const router = express.Router();

//Services
const orderService = require('../services/orderService')
const truckService = require('../services/truckService');
const packageService = require('../services/packageService');

router.post('/', function (req, res, next) {
    const packages = req.body;
    let finalOrder = {};
    orderService.makeOrder(packages)
        .then(order => {

            finalOrder = order;

            return orderService.saveOrder(order)
        })
        .then(savedOrder => {

            const orderID = savedOrder.id;

            const trucks = truckService.getTrucks(packages);
            const asyncTrucksSave = trucks.map(
                truck => truckService.saveTruck(truck, orderID)
            );

            return Promise.all(asyncTrucksSave);
        })
        .then((trucks) => {

            finalOrder.trucks = trucks;
            let asyncPackagesSave = [];

            trucks.forEach(truck => {
                const asyncPackage = truck.load.map(
                    package => packageService.savePackage(package, truck)
                );
                asyncPackagesSave.push(asyncPackage);
            });

            return Promise.all(asyncPackagesSave);
        })
        .then(() => {
            res.send(finalOrder);
        })
        .catch(err => {
            res.send(err);
        })
});


router.get('/', function (req, res, next) {
    orderService.getOrders()
        .then(orders => {
            res.send(orders);
        })
        .catch(err => {
            res.send(err);
        })
});

module.exports = router;