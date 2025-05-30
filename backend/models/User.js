const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    balance: {
        type: Number,
        default: 50000
    }, 
    profitLossPercent: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('User', userSchema);
