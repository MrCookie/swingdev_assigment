const mongoose = require('mongoose');
const OrderTrucks = require('./OrderTrucks')

const Schema = mongoose.Schema;

/**
 * Order Schema
 */

const OrderSchema = new Schema({
    price: Number,
    createdAt: { type: Date, default: new Date() }
}, { toJSON: {virtuals : true} });

/**
 * Validations
 */

OrderSchema.virtual('trucks', {
    ref: 'order_trucks', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'orderID', // is equal to `foreignField`
});

OrderSchema.path('price').required(true, 'Weight cannot be blank!');

module.exports = mongoose.model('order', OrderSchema);