const OrderTrucksLoad = require('../../models/TrucksLoad');

module.exports = function () {

    const savePackage = (package, truck) => {
        packageModel = new OrderTrucksLoad();
        packageModel.loadID = package.id;
        packageModel.truckID = truck;

        // Save packages related to trucks
        packageModel.save((err, saved) => {
            if (err) throw err;
        })
    }

    return {
        savePackage
    }

}();