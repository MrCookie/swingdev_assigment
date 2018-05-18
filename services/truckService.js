const crypto = require("crypto");

const packageService = require('../package')

const TruckModel = require('../models/Truck');

module.exports = function () {

    // Trucks magically appear out of nowhere
    const _createTruck = () => {
        return {
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

        if (packages.length === 0) {
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

            if (truckLoad + package.weight > 1000) {
                truckId++;
                trucks.push(_createTruck());
            }

            _loadTruck(trucks[truckId], package);

        });

        return trucks;
    }

    const saveTruck = (truck, order) => {
        const truckModel = new TruckModel();
        truckModel.orderID = order;

        return truckModel.save()
            .then(savedTruck => {
                return {
                    truckID: savedTruck.id,
                    load: truck.load
                };
            })
    }

    return {
        getTrucks,
        saveTruck
    }

}();