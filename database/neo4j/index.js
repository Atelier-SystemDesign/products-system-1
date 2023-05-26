require('dotenv').config();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  `neo4j://localhost:${process.env.NEO4J_PORT}`,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS),
);

driver.verifyConnectivity()
  .then(() => {
    console.log('success!');
  })
  .catch((err) => {
    console.error(err);
  });

export default driver.session();
