DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  default_price VARCHAR(100)
);
CREATE INDEX idx_product_id ON products (id);


DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE IF NOT EXISTS features (
  id INT PRIMARY KEY,
  product_id INT,
  feature VARCHAR(100),
  value VARCHAR(100),

  FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE INDEX idx_features_product_id ON features (product_id);


DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE IF NOT EXISTS styles (
  id INT PRIMARY KEY,
  productId INT,
  name VARCHAR(100),
  sale_price VARCHAR(100),
  original_price VARCHAR(100),
  default_style BOOLEAN,

  FOREIGN KEY (productId) REFERENCES products(id)
);
CREATE INDEX idx_styles_id ON styles (id);
CREATE INDEX idx_product_styles_id ON styles (productId);

DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE IF NOT EXISTS skus (
  id INT PRIMARY KEY,
  styleId INT,
  size VARCHAR(10),
  quantity SMALLINT,

  FOREIGN KEY (styleId) REFERENCES styles(id)
);
CREATE INDEX idx_skus_styleId ON skus (styleId);


DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE IF NOT EXISTS photos (
  id INT PRIMARY KEY,
  styleId INT,
  url TEXT,
  thumbnail_url TEXT,

  FOREIGN KEY (styleId) REFERENCES styles(id)
);
CREATE INDEX idx_photos_styleId ON photos (styleId);

-- Temporary for pre-transform
DROP TABLE IF EXISTS temp_related_products CASCADE;
CREATE TABLE IF NOT EXISTS temp_related_products (
  id INT PRIMARY KEY,
  current_product_id INT,
  related_product_id INT
);

DROP TABLE IF EXISTS related_products CASCADE;
CREATE TABLE IF NOT EXISTS related_products (
  id INT PRIMARY KEY,
  current_product_id INT,
  related_product_id INT,

  FOREIGN KEY (current_product_id) REFERENCES products(id),
  FOREIGN KEY (related_product_id) REFERENCES products(id)
);
CREATE INDEX idx_current_product_id ON related_products (current_product_id);
CREATE INDEX idx_related_product_id ON related_products (related_product_id);
