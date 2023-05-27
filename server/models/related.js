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
    text: `
      SELECT ARRAY_AGG(related_product_id) AS product_ids
      FROM related_products
      WHERE current_product_id = $1;
    `,
    values: [productId],
  }),
};
