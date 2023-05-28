const client = require('../../database/pg');

module.exports = {
  /**
   * Gets all styles-photo-skus combinations:
   *  {
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
   * @param {number} productId
   */
  getAll: (productId) => client.query({
    text: `
      SELECT
          s.id AS style_id,
          s.name,
          s.original_price,
          s.sale_price,
          s.default_style AS "default?",
          json_agg(
              json_build_object(
                  'thumbnail_url', p.thumbnail_url,
                  'url', p.url
              )
          ) AS photos,
          json_object_agg(
              sk.id,
              json_build_object(
                  'quantity', sk.quantity,
                  'size', sk.size
              )
          ) AS skus
      FROM styles AS s
      LEFT JOIN photos AS p ON p.styleId = s.id
      LEFT JOIN skus AS sk ON sk.styleId = s.id
      WHERE s.productId = $1
      GROUP BY s.id, s.name, s.original_price, s.sale_price, s.default_style
      ORDER BY s.id ASC;
    `,
    values: [productId],
  }),
};
