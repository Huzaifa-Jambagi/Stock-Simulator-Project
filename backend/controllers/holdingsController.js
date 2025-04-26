const Holdings = require('../models/Holdings');
const StockFundamentals = require('../models/Stock');

const getAllHoldings = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get user holdings from database
    let userHoldings = await Holdings.find({ userId });
    
    // Convert to regular JavaScript objects
    userHoldings = userHoldings.map(holding => holding.toObject());
    
    // Get all stock symbols in holdings
    const stockSymbols = userHoldings.map(holding => holding.name);
    
    // Fetch current prices from StockFundamentals
    const stocks = await StockFundamentals.find({
      symbol: { $in: stockSymbols }
    });
    
    // Update holdings with current prices
    for (let holding of userHoldings) {
      // Find matching stock
      const matchedStock = stocks.find(stock => stock.symbol === holding.name);
      
      if (matchedStock && matchedStock.currentPrice) {
        holding.price = matchedStock.currentPrice;
      }
    }
    
    res.json(userHoldings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
};

module.exports = { getAllHoldings };