/* eslint-env jest */

const request = require('supertest');
const testResponses = require('./test-response');

module.exports = (app) => {
  describe('Product API Tests', () => {
    const agent = request(app);

    it('should respond correctly to the route api/products', async () => {
      const response = await agent.get('/api/products').expect(200);

      expect(JSON.parse(response.text)).toEqual(testResponses.products);
    });

    it('should be able to respond correctly with `page` and `count` parameters on /products', async () => {
      const response = await agent.get('/api/products').query({
        page: 45,
        count: 3,
      }).expect(200);

      expect(JSON.parse(response.text)).toEqual(testResponses.products45);
    });

    it('should respond correctly to the route api/products/:product_id', async () => {
      let response = await agent.get('/api/products/347037').expect(200);
      expect(JSON.parse(response.text)).toEqual(testResponses.product347037);

      response = await agent.get('/api/products/999986').expect(200);
      expect(JSON.parse(response.text)).toEqual(testResponses.product999986);
    });
  });
};

