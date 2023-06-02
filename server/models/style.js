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
        styles.id AS style_id,
        styles.name,
        styles.original_price,
        styles.sale_price,
        styles.default_style AS "default?",
        (
          SELECT json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url))
            FROM (
                SELECT DISTINCT ON (photos.thumbnail_url, photos.url)
                    photos.thumbnail_url,
                    photos.url
                FROM photos
                WHERE photos.styleid = styles.id
            ) p
        ) AS photos,
        (
          SELECT json_object_agg(s.id, json_build_object('quantity', s.quantity, 'size', s.size))
            FROM (
                SELECT DISTINCT ON (skus.id)
                    skus.id,
                    skus.quantity,
                    skus.size
                FROM skus
                WHERE skus.styleid = styles.id
            ) s
        ) AS skus
        FROM styles
        WHERE styles.productid = $1
    `,
    values: [productId],
  }),
};
