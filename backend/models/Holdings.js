const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    qty: {
        type: Number,
        required: true,
        min: 0
    },
    avg: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const holdings = mongoose.model("holding", holdingSchema);

module.exports = holdings;