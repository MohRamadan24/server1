require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts') // Adjust path as necessary
const userRoutes = require('./routes/user') // Adjust path as necessary
const cors = require('cors')
const serverless = require('serverless-http')

const app = express()

const corsOption = {
  origin: 'https://trinitydev-mernworkout.vercel.app',
  optionsSuccessStatus: 200
}

app.use(express.json())

app.use((req, res, next) => {
  console.log('Request:', req.path, req.method)
  next()
})

app.use('/api/workouts', cors(corsOption), workoutRoutes)
app.use('/api/user', cors(corsOption), userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.error('Database connection error:', err)
  })

app.get('/', (req, res) => {
  res.send('Server is running')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports.handler = serverless(app)