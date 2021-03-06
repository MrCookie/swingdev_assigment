const PackageModel = require('../models/Package');

module.exports = function () {

    const savePackage = (package, truck) => {
        packageModel = new PackageModel();
        
        packageModel.packageID = package.id;
        packageModel.weight = package.weight;
        packageModel.truckID = truck.truckID;

        return packageModel.save();
    }

    return {
        savePackage
    }

}();