require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

mongoose.Promise = global.Promise
// Connecting to MongoDB Atlas
mongoose
  .connect(process.env.CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB server')
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB server')
    console.log(err)
  })

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Requiring API routes
const todoRoutes = require('./api/routes/todos')

// Handling routes
app.use('/api/todos', todoRoutes)

// Handling production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(`${__dirname}/public/`))

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendfile(`${__dirname}/public/index.html`))
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on ${port}`))
