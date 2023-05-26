const client = require('../../database/pg');

module.exports = {
  /**
   * Gets all features of a product with shape:
   * ```
   *  {
   *    id: number
   *    product_id: number
   *    feature: string
   *    value: string
   *  }[]
   * ```
   * @param {number} productId
   */
  getAll: (productId) => client.query({
    text: 'SELECT * FROM features WHERE product_id = $1',
    values: [productId],
  }),
};
