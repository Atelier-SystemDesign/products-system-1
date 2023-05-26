const { related } = require('../models');

module.exports = {
  /**
   * Sends response for all related items of a product. Has shape `number[]`
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

      const relatedData = (await related.getAll(productId)).rows
        .map((product) => product.related_product_id);
      res.status(200).send(relatedData);
    } catch (e) {
      console.error('Related', e);
      res.status(500).send('Server error occurred!');
    }
  },
};
