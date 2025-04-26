const express = require('express');
const router = express.Router();
const {getAllHoldings} = require('../controllers/holdingsController');
const {authorize}=require('../middlewares');

router.get('/',authorize,getAllHoldings);

module.exports = router;
