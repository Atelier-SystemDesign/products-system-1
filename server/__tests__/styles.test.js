/* eslint-env jest */

const request = require('supertest');
const testResponses = require('./test-response');

module.exports = (app) => {
  describe('Styles API Tests', () => {
    const agent = request(app);

    it('should respond correctly to the route api/products/:product_id/styles', async () => {
      const response = await agent.get('/api/products/810467/styles').expect(200);
      expect(JSON.parse(response.text)).toEqual(testResponses.styles810467);
    });
  });
};
