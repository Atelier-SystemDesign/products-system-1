const redisClient = require('../database/redis');
const { generateCacheKey } = require('../server/utils');

module.exports = async (req, res, next) => {
  const cachedData = await redisClient.get(generateCacheKey(req));
  if (cachedData) {
    res.json(JSON.parse(cachedData));
    return;
  }
  next();
};
