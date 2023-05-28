const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Router
const router = require('./routes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', router);

module.exports = app;
