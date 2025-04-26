const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    marketCap: {
        type: String,
        default: "N/A"
    },
    currentPrice: {
        type: Number,
        default: 0
    },
    previousPrice: {
        type: Number,
        default: 0
    },
    dailyChangePercent: {
        type: String,
        default: "0.00%"
    },
    highLow: {
        type: String,
        default: "N/A"
    },
    peRatio: {
        type: Number,
        default: 0
    },
    bookValue: {
        type: Number,
        default: 0
    },
    roe: {
        type: String,
        default: "N/A"
    }
});

module.exports = mongoose.model('StockFundamentals', StockSchema);