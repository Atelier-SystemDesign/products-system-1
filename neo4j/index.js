const csvToDatabase = require('../import-data/csvToNeo4j');
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  `http://localhost:${process.env.NEO4J_PORT}`,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS),
);

const session = driver.session();

const main = async () => {
  await csvToDatabase('import-data/raw_data', session).products();
};

main();
