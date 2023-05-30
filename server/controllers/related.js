const { related } = require('../models');
const redisClient = require('../../database/redis');
const { generateCacheKey } = require('../utils');

module.exports = {
  /**
   * Sends response for all related items of a product. Has shape `number[]`
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * Complexity: O(n) where n = number of related products to product ID
   *
   */
  get: async (req, res) => {
    try {
      const productId = req.params.product_id;
      if (productId === undefined) {
        res.status(422).send('The request was well-formed but was unable to be followed due to missing a product_id parameter');
        return;
      }

      const relatedData = await related.getAll(productId);
      await redisClient.set(generateCacheKey(req), JSON.stringify(relatedData.rows[0].product_ids));
      res.status(200).send(relatedData.rows[0].product_ids);
    } catch (e) {
      res.status(500).send('Server error occurred!');
    }
  },
};
