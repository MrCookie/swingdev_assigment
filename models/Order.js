const mongoose = require('mongoose');

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
    ref: 'trucks',
    localField: '_id',
    foreignField: 'orderID',
});

OrderSchema.path('price').required(true, 'Weight cannot be blank!');

module.exports = mongoose.model('order', OrderSchema);