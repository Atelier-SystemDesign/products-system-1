/* eslint-env jest */
const app = require('..');
const client = require('../../database/pg');

const productsTest = require('./products.test');
const relatedTest = require('./related.test');
const stylesTest = require('./styles.test');

describe('Server Route Tests', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
    client.connect();
  });

  afterAll((done) => {
    client.end();
    server.close(done);
  });

  productsTest(app);
  relatedTest(app);
  stylesTest(app);
});
