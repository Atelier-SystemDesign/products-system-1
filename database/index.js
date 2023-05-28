require('dotenv').config();

const { Pool } = require('pg');

const client = new Pool({
  database: process.env.DATABASE_NAME,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  host: 'localhost',
});

client.connect();

module.exports = client;
