const Stock = require('../models/Stock');

// GET /allStocks
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({}, 'symbol currentPrice dailyChangePercent');
    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /allStocks/:symbol
const getStockBySymbol = async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol });
    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stock fundamentals' });
  }
};

module.exports= {getStockBySymbol,getAllStocks}