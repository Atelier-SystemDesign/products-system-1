const { styles } = require('../models');

module.exports = {
  /**
   * Sends response for all styles of a product with correct shape:
   * ```
   * {
   *  product_id: string
   *  results: {
   *    style_id: number
   *    name: string
   *    original_price: string
   *    sale_price: string
   *    'default?': boolean
   *    photos: {
   *      thumbnail_url: string
   *      url: string
   *    }[]
   *    skus: {
   *      [key: string]: {
   *        quantity: number
   *        size: string
   *      }
   *    }
   *  }[]
   * }
   * ```
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  get: async (req, res) => {
    try {
      const productId = req.params.product_id;
      if (productId === undefined) {
        res.status(422).send('The request was well-formed but was unable to be followed due to missing a product_id parameter');
        return;
      }
      const results = (await styles.getAll(productId)).rows;
      res.status(200).json({ results, product_id: productId });
    } catch (e) {
      res.status(500).send('A server error has occurred!!');
    }
  },
};
