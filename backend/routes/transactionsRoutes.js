const express = require('express');
const router = express.Router();
const { buyStock, sellStock } = require('../controllers/transactionsController');
const {authorize}=require('../middlewares');

// Buy stocks
router.post('/buy',authorize, buyStock);    

// Sell stocks
router.post('/sell',authorize, sellStock);   

module.exports = router;