const client = require('../../database/pg');

module.exports = {
  /**
   * Gets all styles from database with shape:
   *  {
   *    id: number
   *    productId: number
   *    name: string
   *    sale_price: string
   *    original_price: string
   *    default_style: boolean
   *  }[]
   * @param {number} productId
   */
  getAll: (productId) => client.query({
    text: 'SELECT * FROM styles WHERE $1 = productId',
    values: [productId],
  }),
};
