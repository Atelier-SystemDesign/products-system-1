require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  database: process.env.DATABASE_NAME,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  host: 'localhost',
});

client.connect();

module.exports = client;
