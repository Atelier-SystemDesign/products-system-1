const Promise = require('bluebird');
const { styles, photos, skus } = require('../models');

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

      const styleData = (await styles.getAll(productId)).rows
        .map(async (style) => {
          // Get and transform photo data
          const photoData = (await photos.getAll(style.id)).rows
            .map((photo) => ({
              thumbnail_url: (photo.thumbnail_url === 'null' ? null : photo.thumbnail_url) || '',
              url: (photo.url === 'null' ? null : photo.url) || '',
            }));

          // Get and transform sku data
          const skuData = (await skus.getAll(style.id)).rows
            .reduce((accum, current) => {
              console.log('HERE', accum, current);
              // eslint-disable-next-line no-param-reassign
              accum[current.id] = {
                quantity: current.quantity || 0,
                size: (current.size === 'null' ? null : current.size) || '',
              };
              return accum;
            }, {});

          const result = {
            style_id: style.id,
            name: (style.name === 'null' ? null : style.name) || '',
            sale_price: (style.sale_price === 'null' ? null : style.sale_price) || '0',
            'default?': (style.default_style === 'null' ? null : style.default_style) || '',
            original_price: (style.original_price === 'null' ? null : style.original_price) || '0',
            photos: photoData || [],
            skus: skuData || {},
          };
          return result;
        });
      const result = {
        product_id: productId,
        results: await Promise.all(styleData),
      };
      console.log('bruh', result);
      res.status(200).send(result);
    } catch (e) {
      console.error('Styles', e);
      res.status(500).send('A server error has occurred!!');
    }
  },
};
