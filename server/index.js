require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const cacheMiddleware = require('../middleware/cacheMiddleware');

// Router
const router = require('./routes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
// app.use(cacheMiddleware);

app.get(process.env.LOADER_ID, (req, res) => res.status(200).send(process.env.LOADER_ID));

app.use('/api', router);

module.exports = app;
