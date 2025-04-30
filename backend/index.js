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
const PORT = process.env.PORT ;
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

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Routes
app.use('/api/users',userRoutes)
app.use('/api/stocks', stockRoutes);
app.use('/api/holdings', holdingsRoutes);
app.use('/api/transactions',transactionsRoutes);

//test
app.get('/test', (req, res) => {
  res.send('Backend is working!');
});

// Start server
app.listen(PORT, async () => {
  console.log(`Starting server on port ${PORT}`);
   try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(url);
    console.log('MongoDB connected successfully');
    console.log('Starting stock updater...');
    stockUpdater();
    console.log(`Server is now running and listening on port ${PORT}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
});


