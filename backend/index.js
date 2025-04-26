require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const stockRoutes = require('./routes/stockRoutes');
const holdingsRoutes = require('./routes/holdingsRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');
const stockUpdater = require('./services/stockUpdater'); 

const app = express();
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const tempurl="mongodb://127.0.0.1:27017/paper_trading"

if (!url) {
  console.error('MONGO_URL is not defined in .env');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users',userRoutes)
app.use('/api/stocks', stockRoutes);
app.use('/api/holdings', holdingsRoutes);
app.use('/api/transactions',transactionsRoutes);

// Start server
app.listen(PORT, async () => {
  try {
    await mongoose.connect(url);
    console.log(' MongoDB connected');

    // Start cron job
   stockUpdater();
    console.log(' Server running on port', PORT);
  } catch (err) {
    console.error(' MongoDB connection error:', err);
  }
});


