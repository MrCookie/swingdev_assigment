const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * TrucksLoadSchema Schema
 */

const TrucksLoadSchema = new Schema({
    loadID: String,
    truckID: [
        {type: Schema.Types.ObjectId, ref: 'order_trucks'}
    ]
}, { toJSON: {virtuals : true} });

/**
 * Validations
 */

TrucksLoadSchema.path('loadID').required(true, 'loadID cannot be blank!');
TrucksLoadSchema.path('truckID').required(true, 'truckID cannot be blank!');

module.exports = mongoose.model('order_trucks_load', TrucksLoadSchema);