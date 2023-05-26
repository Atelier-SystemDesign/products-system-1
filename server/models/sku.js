const client = require('../../database/pg');

module.exports = {
  /**
   * Gets all skus from database with shape:
   * ```
   *  {
   *    id: number
   *    styleId: number
   *    size: string
   *    quantity: number
   *  }[]
   * ```
   * @param {number} styleId
   */
  getAll: (styleId) => client.query({
    text: 'SELECT * FROM skus WHERE $1 = styleId',
    values: [styleId],
  }),
};
