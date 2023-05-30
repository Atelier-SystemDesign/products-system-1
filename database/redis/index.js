require('dotenv').config();
const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS,
  enableAutoPipelining: true,
  maxRetriesPerRequest: 2,
  lazyConnect: true,
  cache: {
    name: 'lfu',
    max: 1000000,
  },
});

redisClient.ping((error) => {
  if (error) {
    console.error('Error connecting to Redis:', error);
  } else {
    console.log('Connected to Redis');
  }
});

module.exports = redisClient;
