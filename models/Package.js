const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Package Schema
 */

const PackageSchema = new Schema({
    weight: Number,
    packageID: String,
    truckID: [
        {type: Schema.Types.ObjectId, ref: 'trucks'}
    ]
}, { toJSON: {virtuals : true} });

/**
 * Validations
 */

PackageSchema.path('weight').required(true, 'weight cannot be blank!');
PackageSchema.path('packageID').required(true, 'packageID cannot be blank!');
PackageSchema.path('truckID').required(true, 'truckID cannot be blank!');

module.exports = mongoose.model('packages', PackageSchema);
