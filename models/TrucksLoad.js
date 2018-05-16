const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Package Schema
 */

const OrderTrucksLoadSchema = new Schema({
    loadID: String,
    truckID: [
        {type: Schema.Types.ObjectId, ref: 'order_trucks'}
    ]
}, { toJSON: {virtuals : true} });

/**
 * Validations
 */

OrderTrucksLoadSchema.path('loadID').required(true, 'loadID cannot be blank!');
OrderTrucksLoadSchema.path('truckID').required(true, 'truckID cannot be blank!');

module.exports = mongoose.model('order_trucks_load', OrderTrucksLoadSchema);