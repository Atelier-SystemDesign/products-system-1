const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Router
const router = require('./routes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(cacheMiddleware);

app.use('/api', router);

module.exports = app;
