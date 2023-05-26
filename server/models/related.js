const client = require('../../database/pg');

module.exports = {
  /**
   * Gets all products that are related to productId to and places their ids into an array of shape:
   * ```
   *  {
   *    related_product_id: number
   *  }[]
   * ```
   * @param {number} productId
   */
  getAll: (productId) => client.query({
    text: 'SELECT (related_product_id) FROM related_products WHERE $1 = current_product_id',
    values: [productId],
  }),
};
