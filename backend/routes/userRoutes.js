const express = require('express');
const router = express.Router();
const { handleSignup,handleLogin,getUserDetails} = require('../controllers/userController.js');
const { authorize } = require('../middlewares'); 

// Use the imported functions directly
router.post('/register',handleSignup) ;
router.post('/login',handleLogin) ;
router.get('/details', authorize, getUserDetails);


module.exports = router;
