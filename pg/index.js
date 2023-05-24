require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  database: process.env.DATABASE_NAME,
  port: process.env.PORT,
  host: 'localhost',
  user: 'postgres',
});

client.connect()
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        slogan VARCHAR(100),
        description TEXT,
        category VARCHAR(100),
        default_price VARCHAR(100)
      );
    `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS features (
        id SERIAL PRIMARY KEY,
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
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        original_price VARCHAR(100),
        default_style BOOLEAN
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS skus (
        id SERIAL PRIMARY KEY,
        quantity SMALLINT,
        size VARCHAR(10),
        style_id INT,

        FOREIGN KEY (style_id) REFERENCES styles(id)
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
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
        id SERIAL PRIMARY KEY,
        product_a_id INT,
        product_b_id INT,

        FOREIGN KEY (product_a_id) REFERENCES products(id),
        FOREIGN KEY (product_b_id) REFERENCES products(id)
      );
  `))
  .then(() => client.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        sku_id INT,

        FOREIGN KEY (sku_id) REFERENCES skus(id)
      );
  `))
  .then(() => client.query(`
      CREATE INDEX
  `))
  .then(() => {
    console.log('Tables created successfully.');

    client.end(); // Close the connection
  })
  .catch((err) => {
    console.error('Error executing queries:', err);
    client.end(); // Close the connection
  });
