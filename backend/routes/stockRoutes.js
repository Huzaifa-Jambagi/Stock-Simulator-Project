const express = require('express');
const router = express.Router();
const { getStockBySymbol, getAllStocks } = require('../controllers/stockController');
const {authorize}=require('../middlewares');

// Use the imported functions directly
router.get('/', getAllStocks);
router.get('/:symbol', getStockBySymbol);

module.exports = router;
