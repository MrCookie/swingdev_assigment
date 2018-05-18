const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * OrderTrucks Schema
 */

const TruckSchema = new Schema({
    orderID: [
        {type: Schema.Types.ObjectId, ref: 'order'}
    ]
}, { toJSON: {virtuals : true} });

TruckSchema.virtual('packages', {
    ref: 'packages',
    localField: '_id',
    foreignField: 'truckID',
});

/**
 * Validations
 */

TruckSchema.path('orderID').required(true, 'orderID cannot be blank!');

module.exports = mongoose.model('trucks', TruckSchema);