const express = require('express');

const morgan = require('morgan');

// Router
const router = require('./routes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Products listening at ${process.env.SERVER_PORT}`);
});
