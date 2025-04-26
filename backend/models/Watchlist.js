const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  percent: {
    type: Number, 
    required: true,
  },
  isDown: {
    type: Boolean,
    required: true,
  },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;
