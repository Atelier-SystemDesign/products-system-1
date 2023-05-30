const { products } = require('../models');
const redisClient = require('../../database/redis');
const { generateCacheKey } = require('../utils');

module.exports = {
  /**
   * Sends response for all data with correct shape:
   * ```
   *  {
   *    id: number
   *    name: string
   *    slogan: string
   *    description: string
   *    category: string
   *    default_price: string
   *  }[]
   * ```
   *
   * Complexity: O(n) where n = number of products
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  getAll: async (req, res) => {
    try {
      const result = await products.getAll(req.query.page, req.query.count);
      await redisClient.set(generateCacheKey(req), JSON.stringify(result.rows));

      res.status(200).json(result.rows);
    } catch (e) {
      res.status(500).send('A server error has occurred!');
    }
  },

  /**
   * Sends response for one product with correct shape:
   * ```
   * {
   *  id: number
   *  name: string
   *  slogan: string
   *  description: string
   *  category: string
   *  default_price: string
   *  features: {
   *    feature: string
   *    value: string
   *  }[]
   * }
   * ```
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  getOne: async (req, res) => {
    try {
      const productId = req.params.product_id;
      if (productId === undefined) {
        res.status(422).send('The request was well-formed but was unable to be followed due to missing a product_id parameter');
        return;
      }

      const productData = await products.getOne(productId);
      await redisClient.set(generateCacheKey(req), JSON.stringify(productData.rows[0]));

      res.status(200).json(productData.rows[0]);
    } catch (e) {
      res.status(500).send('A server error has occurred!');
    }
  },
};
