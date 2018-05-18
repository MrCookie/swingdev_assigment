const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Package Schema
 */

const PackageSchema = new Schema({
    weight: String,
    truckID: [
        {type: Schema.Types.ObjectId, ref: 'trucks'}
    ]
}, { toJSON: {virtuals : true} });

/**
 * Validations
 */

PackageSchema.path('weight').required(true, 'weight cannot be blank!');
PackageSchema.path('truckID').required(true, 'truckID cannot be blank!');

module.exports = mongoose.model('packages', PackageSchema);