require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('../routes/workouts'); // Adjust path as necessary
const userRoutes = require('../routes/user'); // Adjust path as necessary
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

// Enable CORS for all origins and methods
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log('Request:', req.path, req.method);
  next();
});

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to database');
  // listen to port
  app.listen(process.env.PORT, () => {
    console.log('Listening for requests on port', process.env.PORT);
  });
})
.catch((err) => {
  console.error('Error connecting to database:', err.message);
  process.exit(1); // Exit process on database connection error
});

app.get("/api/rama/bruh", (req, res) => {
  res.json({ message: "Hello World!"});
})

// Export app for serverless function
// module.exports.handler = serverless(app);
module.exports = app;
