const crypto = require("crypto");

const packageService = require('../package')

const TruckModel = require('../models/Truck');

module.exports = function () {

    const MAX_TRUCK_LOAD = 1000;

    // Trucks magically appear out of nowhere
    const _createTruck = () => {
        return {
            load: []
        }
    }

    const _loadTruck = (truck, package) => {
        let loadedTruck = truck;
        loadedTruck.load.push({
            id: package.id,
            weight: package.weight
        })
        return loadedTruck;
    }

    const getTrucks = packages => {

        if (packages.length === 0) {
            return {};
        }
        
        const sortedPackages = packages.sort((a, b) => {
            return a.weight - b.weight;
        });
        
        let trucks = [
                _createTruck()
            ],
            truckId = 0;

        sortedPackages.forEach(package => {

            const truckLoad = trucks[truckId].load.reduce((sum, package) => {
                return package.weight + sum;
            }, 0)

            if (truckLoad + package.weight > MAX_TRUCK_LOAD) {
                truckId++;
                trucks.push(_createTruck());
            }

            trucks[truckId] = _loadTruck(trucks[truckId], package);

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