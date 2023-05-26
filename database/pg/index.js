require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  database: process.env.DATABASE_NAME,
  port: process.env.POSTGRES_PORT,
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
});

module.exports = client;
