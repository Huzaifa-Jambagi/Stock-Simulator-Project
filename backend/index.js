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

// Middleware
app.use(cors({
  origin: [
    'https://stock-simulator-project.vercel.app', // frontend
    'https://stock-simulator-dashboard.vercel.app' // dashboard
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users',userRoutes)
app.use('/api/stocks', stockRoutes);
app.use('/api/holdings', holdingsRoutes);
app.use('/api/transactions',transactionsRoutes);

//test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

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


