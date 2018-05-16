const truckService = require('../truck');

const Order = require('../../models/order/Order');

module.exports = function () {

    const makeOrder = (packages, callback) => {
        let totalPrice = 0,
            error;

        packages.forEach(package => {

            if (package.weight > 500) {
                error = {
                    status: 'error',
                    message: 'Max package weight exceeded'
                }
            }

            totalPrice += (package.weight > 400) ?
                2 + 0.005 * package.weight :
                0.01 * package.weight
        });

        const trucks = truckService.getTrucks(packages);

        if (error) {
            callback(error);
        } else {
            callback(null, {
                price: totalPrice,
                trucks
            })
        }
    }

    const saveOrder = orderDetails => {

        const order = new Order();
        order.price = orderDetails.price;

        // Save order
        order.save((err, saved) => {
            if (err) return err;

            const orderID = saved.id;

            orderDetails.trucks.forEach(truck => {
                truckService.saveTruck(truck, orderID);
            })
        })

        return true;
    }

    const getOrders = () => {
        return Order.find({})
            .populate({
                path: 'trucks',
                populate: {
                    path: 'packages'
                }
            })
            .catch(err => {
                throw err;
            })
    }

    return {
        makeOrder,
        saveOrder,
        getOrders
    }

}();