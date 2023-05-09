require('dotenv').config()
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes/index')
const app = express();


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

//db
require('./db/db.mongodb')

//init route
app.use('/', routes)

//handle error
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    message: error.message || 'Interval server error'
  })
})

module.exports = app