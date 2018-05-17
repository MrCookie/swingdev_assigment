const truckService = require('../truck');

const Order = require('../../models/Order');

module.exports = function () {

    const _validate = package => {
        const errors = {
            max_weight: 'Max package weight exceeded',
            no_id: 'No id found',
            no_weight: 'No weight found'
        }
        let error = {
            status: 'error',
            message: null
        }

        if (!package.hasOwnProperty('id')) {
            error.message = errors.no_id;
            return error;
        }
        if (!package.hasOwnProperty('weight')) {
            error.message = errors.no_weight;
            return error;
        }
        if (package.weight > 500) {
            error.message = errors.max_weight;
            return error;
        }
        return true;
    }

    const makeOrder = (packages, callback) => {
        let totalPrice = 0,
            error;

        packages.forEach(package => {

            const valid = _validate(package);
            if (valid.status === 'error') {
                error = valid;
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

    const saveOrder = (orderDetails, callback) => {

        const order = new Order();
        order.price = orderDetails.price;

        // Save order
        order.save((err, saved) => {
            if (err) throw err;

            const orderID = saved.id;

            orderDetails.trucks.forEach(truck => {
                truckService.saveTruck(truck, orderID)
            })
        })
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