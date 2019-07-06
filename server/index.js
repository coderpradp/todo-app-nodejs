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

app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on ${port}`))
