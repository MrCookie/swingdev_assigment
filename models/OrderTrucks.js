const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * OrderTrucks Schema
 */

const OrderTrucksSchema = new Schema({
    truckID: String,
    orderID: [
        {type: Schema.Types.ObjectId, ref: 'order'}
    ]
}, { toJSON: {virtuals : true} });

OrderTrucksSchema.virtual('packages', {
    ref: 'order_trucks_load',
    localField: '_id',
    foreignField: 'truckID',
});

/**
 * Validations
 */

OrderTrucksSchema.path('truckID').required(true, 'Weight cannot be blank!');
OrderTrucksSchema.path('orderID').required(true, 'orderID cannot /be blank!');

module.exports = mongoose.model('order_trucks', OrderTrucksSchema);