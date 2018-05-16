const packageService = require('../package')

const OrderTrucks = require('../../models/order/OrderTrucks');

module.exports = function() {

    // Trucks magically appear out of nowhere
    const _createTruck = () => {
        return {
            truckID: Math.random().toString(36).substr(2, 16),
            load: []
        }
    }

    const _loadTruck = (truck, package) => {
        truck.load.push({
            id: package.id,
            weight: package.weight
        })
    }

    const getTrucks = packages => {

        if(packages.length === 0) {
            return {};
        }

        let trucks = [
            _createTruck()
        ],
        truckId = 0;

        packages.forEach(package => {

            const truckLoad = trucks[truckId].load.reduce((sum, package) => {
                return package.weight + sum;
            }, 0)

            if(truckLoad + package.weight > 1000) {
                truckId++;
                trucks.push(_createTruck());
            }
            
            _loadTruck(trucks[truckId], package);

        });

        return trucks;
    }

    const saveTruck = (truck, order) => {
        const truckModel = new OrderTrucks();
        truckModel.truckID = truck.truckID;
        truckModel.orderID = order;

        // Save trucks related to order
        truckModel.save((err, saved) => {
            
            if(err) throw err;
            const truckID = saved.id;

            truck.load.forEach(package => {
                packageService.savePackage(package, truckID);
            })
        })
    }

    return {
        getTrucks,
        saveTruck
    }

}();