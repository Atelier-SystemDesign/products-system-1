const client = require('../../database/pg');

module.exports = {
  /**
   * Gets all photos from database with shape:
   * ```
   *  {
   *    id: number
   *    styleId: number
   *    url: string
   *    thumbnail_url: string
   *  }[]
   * ```
   * @param {number} styleId
   */
  getAll: (styleId) => client.query({
    text: 'SELECT * FROM photos WHERE styleId = $1',
    values: [styleId],
  }),
};
