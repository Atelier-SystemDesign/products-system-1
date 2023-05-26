const { products, features } = require('../models');

module.exports = {
  /**
   * Sends response for all data with correct shape:
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
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  getAll: async (req, res) => {
    try {
      const result = (await products.getAll(req.query.page, req.query.count)).rows
        .map((product) => ({
          id: product.id,
          name: (product.name === 'null' ? null : product.name) || '',
          slogan: (product.slogan === 'null' ? null : product.slogan) || '',
          description: (product.description === 'null' ? null : product.description) || '',
          category: (product.category === 'null' ? null : product.category) || '',
          default_price: (product.default_price === 'null' ? null : product.default_price) || '',
        }));
      res.status(200).send(result);
    } catch (e) {
      console.error('Related', e);
      res.status(500).send('A server error has occurred!');
    }
  },

  /**
   * Sends response for one product with correct shape:
   * ```
   * {
   *  id: number
   *  name: string
   *  slogan: string
   *  description: string
   *  category: string
   *  default_price: string
   *  features: {
   *    feature: string
   *    value: string
   *  }[]
   * }
   * ```
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  getOne: async (req, res) => {
    try {
      const productId = req.params.product_id;
      if (productId === undefined) {
        res.status(422).send('The request was well-formed but was unable to be followed due to missing a product_id parameter');
        return;
      }

      const productData = (await products.getOne(productId)).rows[0];
      const featureData = (await features.getAll(productId)).rows
        .map(({ feature, value }) => ({
          feature: (feature === 'null' ? null : feature) || '',
          value: (value === 'null' ? null : value) || '',
        }));

      const result = {
        id: productData.id,
        name: (productData.name === 'null' ? null : productData.name) || '',
        slogan: (productData.slogan === 'null' ? null : productData.slogan) || '',
        description: (productData.description === 'null' ? null : productData.description) || '',
        category: (productData.category === 'null' ? null : productData.category) || '',
        default_price: (productData.default_price === 'null' ? null : productData.default_price) || '',
        features: featureData || [],
      };

      res.status(200).send(result);
    } catch (e) {
      console.error('Products', e);
      res.status(500).send('A server error has occurred!');
    }
  },
};
