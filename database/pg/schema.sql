DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  default_price VARCHAR(100)
);


DROP TABLE IF EXISTS features;
CREATE TABLE IF NOT EXISTS features (
  id INT PRIMARY KEY,
  product_id INT,
  feature VARCHAR(100),
  value VARCHAR(100),

  FOREIGN KEY (product_id) REFERENCES products(id)
);


DROP TABLE IF EXISTS styles;
CREATE TABLE IF NOT EXISTS styles (
  id INT PRIMARY KEY,
  productId INT,
  name VARCHAR(100),
  sale_price VARCHAR(100),
  original_price VARCHAR(100),
  default_style BOOLEAN,

  FOREIGN KEY (productId) REFERENCES products(id)
);


DROP TABLE IF EXISTS skus;
CREATE TABLE IF NOT EXISTS skus (
  id INT PRIMARY KEY,
  styleId INT,
  size VARCHAR(10),
  quantity SMALLINT,

  FOREIGN KEY (styleId) REFERENCES styles(id)
);


DROP TABLE IF EXISTS photos;
CREATE TABLE IF NOT EXISTS photos (
  id INT PRIMARY KEY,
  styleId INT,
  url TEXT,
  thumbnail_url TEXT,

  FOREIGN KEY (styleId) REFERENCES styles(id)
);


DROP TABLE IF EXISTS temp_related_products;
CREATE TABLE IF NOT EXISTS temp_related_products (
  id INT PRIMARY KEY,
  current_product_id INT,
  related_product_id INT
);

DROP TABLE IF EXISTS related_products;
CREATE TABLE IF NOT EXISTS related_products (
  id INT PRIMARY KEY,
  current_product_id INT,
  related_product_id INT,

  FOREIGN KEY (current_product_id) REFERENCES products(id),
  FOREIGN KEY (related_product_id) REFERENCES products(id)
);
