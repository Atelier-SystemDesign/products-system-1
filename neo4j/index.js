require('dotenv').config();

const neo4j = require('neo4j-driver');
const csvToDatabase = require('../import-data/csvToNeo4j');

const driver = neo4j.driver(
  // `bolt://localhost:${process.env.NEO4J_PORT}`,
  'neo4j://localhost:7687',
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS),
);

driver.verifyConnectivity()
  .then(() => {
    console.log('success!');
  })
  .catch((err) => {
    console.error(err);
  });

const session = driver.session();

const main = async () => {
  try {
    // await csvToDatabase('import-data/raw_data', session).product();
    await csvToDatabase('import-data/raw_data', session).feature();
    // await csvToDatabase('import-data/raw_data', session).style();
    // await csvToDatabase('import-data/raw_data', session).sku();
    // await csvToDatabase('import-data/raw_data', session).photo();
    // await csvToDatabase('import-data/raw_data', session).related();
    // await csvToDatabase('import-data/raw_data', session).cart();
  } catch (error) {
    console.error('Error creating node:', error);
  } finally {
    // Close the session and driver
    session.close();
    driver.close();

    console.log('\n\n\ncomplete!!!!!');
  }
};

main();
