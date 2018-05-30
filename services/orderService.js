const OrderModel = require('../models/Order');
const truckService = require('./truckService')

module.exports = function () {

    const _validate = package => {
        const errors = {
            max_weight: `Max package weight exceeded in package: ${package.id}`,
            no_id: 'No id found',
            no_weight: `No weight found in package:  ${package.id}`
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

    const makeOrder = packages => {
        return new Promise((resolve, reject) => {
            let totalPrice = 0,
                error = {
                    status: 'error',
                    messages: []
                };

            if(!packages.length) {
                error.messages = "No packages found!";
                return error;
            }

            packages.forEach(package => {

                const valid = _validate(package);
                if (valid.status === 'error') {
                    error.messages.push(valid.message);
                }

                totalPrice += (package.weight > 400) ?
                    2 + 0.005 * package.weight :
                    0.01 * package.weight
            });

            if (error.messages.length > 0) {
                reject(error);
            } else {
                resolve({
                    price: totalPrice
                })
            }
        });

    }

    const saveOrder = orderDetails => {

        const order = new OrderModel();
        order.price = orderDetails.price;

        return order.save();
    }

    const getOrders = (offset = 0, limit = 20) => {

        if (limit > 100) limit = 100;

        return OrderModel.find({})
            .skip(offset)
            .limit(limit)
            .populate({
                path: 'trucks',
                select: 'truckID packages',
                populate: {
                    path: 'packages',
                    model: 'packages',
                    select: 'packageID weight',
                }
            })
    }

    return {
        makeOrder,
        saveOrder,
        getOrders
    }

}();