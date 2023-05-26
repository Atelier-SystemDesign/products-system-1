/* eslint-env jest */

const request = require('supertest');
const testResponses = require('./test-response');

module.exports = (app) => {
  describe('Related API Tests', () => {
    const agent = request(app);

    it('should respond correctly to the route api/products', async () => {
      const response = await agent.get('/api/products/810464/related').expect(200);
      expect(JSON.parse(response.text)).toEqual(testResponses.related810464);
    });
  });
};
