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

module.exports = app