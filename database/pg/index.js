require('dotenv').config();

const { Pool } = require('pg');

const client = new Pool({
  database: process.env.DATABASE_NAME,
  port: process.env.POSTGRES_PORT,
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
});

module.exports = client;
