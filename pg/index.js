require('dotenv').config();

const { Client } = require('pg');
// const csvToDatabase = require('../import-data/csvToPostgres');

const client = new Client({
  database: process.env.DATABASE_NAME,
  port: process.env.POSTGRES_PORT,
  host: 'localhost',
  user: 'postgres',
});

client.connect()
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY,
        name VARCHAR(100),
        slogan VARCHAR(255),
        description TEXT,
        category VARCHAR(100),
        default_price VARCHAR(100)
      );
    `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS features (
        id INT PRIMARY KEY,
        name VARCHAR(100),
        value VARCHAR(100)
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS features_products (
        id SERIAL PRIMARY KEY,
        product_id INT,
        feature_id INT,

        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (feature_id) REFERENCES features(id)
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS styles (
        id INT PRIMARY KEY,
        product_id INT,
        name VARCHAR(100),
        original_price VARCHAR(100),
        sale_price VARCHAR(100),
        default_style BOOLEAN,

        FOREIGN KEY (product_id) REFERENCES products(id)
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS skus (
        id INT PRIMARY KEY,
        quantity SMALLINT,
        size VARCHAR(10),
        style_id INT,

        FOREIGN KEY (style_id) REFERENCES styles(id)
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS photos (
        id INT PRIMARY KEY,
        url VARCHAR(255),
        thumbnail_url VARCHAR(255)
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS photos_styles (
        id SERIAL PRIMARY KEY,
        photo_id INT,
        style_id INT,

        FOREIGN KEY (photo_id) REFERENCES photos(id),
        FOREIGN KEY (style_id) REFERENCES styles(id)
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS related_products (
        id INT PRIMARY KEY,
        product_a_id INT,
        product_b_id INT,

        FOREIGN KEY (product_a_id) REFERENCES products(id),
        FOREIGN KEY (product_b_id) REFERENCES products(id)
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INT PRIMARY KEY,
        count INT
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS cart_items_skus (
        id SERIAL PRIMARY KEY,
        sku_id INT,
        cart_items_id INT,

        FOREIGN KEY (sku_id) REFERENCES skus(id),
        FOREIGN KEY (cart_items_id) REFERENCES cart_items(id)
      );
  `))
  .then(() => {
    console.log('Tables created successfully.');

    // Data processing:

    // return csvToDatabase('import-data/raw_data', client).products();
    // return csvToDatabase('import-data/raw_data', client).features();
    // return csvToDatabase('import-data/raw_data', client).styles();
    // return csvToDatabase('import-data/raw_data', client).skus();
    // return csvToDatabase('import-data/raw_data', client).photos();
    // return csvToDatabase('import-data/raw_data', client).related();
    // return csvToDatabase('import-data/raw_data', client).cart();
  })
  .then(() => {
    console.log('finished task!');
    client.end(); // Close the connection
  })
  .catch((err) => {
    console.error('Error executing queries:', err);
    client.end(); // Close the connection
  });
