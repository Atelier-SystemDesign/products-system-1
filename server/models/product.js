const client = require('../../database/pg');

module.exports = {
  /**
   * Grabs all products from database with shape:
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
   */
  getAll: (page = 1, count = 5) => {
    const [start, end] = [(page - 1) * count + 1, (page) * count];
    return client.query({
      text: 'SELECT * FROM products WHERE ($1 <= id AND id <= $2)',
      values: [start, end],
    });
  },

  /**
   * Grabs one product from database with shape:
   * ```
   *  {
   *    id: number
   *    name: string
   *    slogan: string
   *    description: string
   *    category: string
   *    default_price: string
   *  }
   * ```
   *
   * @param {number} productId
   */
  getOne: (productId) => client.query({
    text: 'SELECT * FROM products WHERE id = $1',
    values: [productId],
  }),
};
