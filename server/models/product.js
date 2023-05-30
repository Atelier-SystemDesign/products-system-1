const pool = require('../../database/pg');

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

    return pool.query({
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
   *    features: {
   *      feature: string
   *      value: string
   *    }[]
   *  }
   * ```
   *
   * @param {number} productId
   */
  getOne: (productId) => pool.query({
    text: `
      SELECT
        p.id,
        p.name,
        p.slogan,
        p.description,
        p.category,
        p.default_price,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'feature', f.feature,
            'value', f.value
          ) ORDER BY f.id ASC
        ) AS features
      FROM products AS p
      LEFT JOIN features AS f ON f.product_id = p.id
      WHERE p.id = $1
      GROUP BY p.id, p.name, p.slogan, p.description, p.category, p.default_price
    `,
    values: [productId],
  }),
};
