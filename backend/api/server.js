require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('../routes/workouts');
const userRoutes = require('../routes/user');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

// Allow all origins and methods
app.use(cors());

app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log('Request:', req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.get('/api/rama/bruh', (req, res) => {
  res.json({ message: "Hello World!" });
});

// DB connect (optional: check if already connected in serverless env)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to DB'))
.catch((err) => console.error('DB connection error:', err.message));

// Export as serverless function
module.exports = serverless(app);
