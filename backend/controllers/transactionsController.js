const User = require('../models/User');
const Holding = require('../models/Holdings');

const buyStock = async (req, res) => {
  const {  symbol: stockName, price: buyPrice, qty: quantity } = req.body;
  const userId = req.userId;
  const totalCost = buyPrice * quantity;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    console.log(user)
    if (user.balance < totalCost) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    let holding = await Holding.findOne({ userId, name: stockName });

    if (holding) {
      const newQty = holding.qty + quantity;
      const newAvg = ((holding.qty * holding.avg) + (quantity * buyPrice)) / newQty;

      holding.qty = newQty;
      holding.avg = newAvg;
      holding.price = buyPrice; 
    } else {
      holding = new Holding({
        userId,
        name: stockName,
        qty: quantity,
        avg: buyPrice,
        price: buyPrice
      });
    }

    user.balance -= totalCost;

    await holding.save();
    await user.save();

    res.status(200).json({ message: 'Stock bought successfully', holding, balance: user.balance });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//sell

const sellStock = async (req, res) => {
    const {  stockName, sellPrice, quantity } = req.body;
    const userId = req.userId;
    const totalGain = sellPrice * quantity;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const holding = await Holding.findOne({ userId, name: stockName });
      if (!holding) return res.status(400).json({ message: 'You do not hold this stock' });
  
      if (holding.qty < quantity) {
        return res.status(400).json({ message: 'Not enough quantity to sell' });
      }
  
      holding.qty -= quantity;
  
      if (holding.qty === 0) {
        await Holding.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }
  
      user.balance += totalGain;
      await user.save();
  
      res.status(200).json({ message: 'Stock sold successfully', balance: user.balance });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports={buyStock,sellStock}