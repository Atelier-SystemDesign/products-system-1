require('dotenv').config();

const { Pool } = require('pg');

const client = new Pool();

module.exports = client;
