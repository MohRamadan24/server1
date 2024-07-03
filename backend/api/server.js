require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('../routes/workouts')
const userRoutes = require('../routes/user')
const cors = require('cors')

// express app
const app = express()

// cors
const corsOption = {
  origin: 'https://trinitydev-mernworkout.vercel.app',
  optionsSuccessStatus: 200
}

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', cors(corsOption), workoutRoutes)
app.use('/api/user',cors(corsOption), userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log(' >_< istening for requests on port', process.env.PORT)
    })
    
  })
  .catch((err) => {
    console.log(err)
  }) 