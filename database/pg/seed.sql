
\set productfile :raw_data_dir '/product.csv'
\set featurefile :raw_data_dir '/features.csv'
\set stylefile :raw_data_dir '/styles.csv'
\set skufile :raw_data_dir '/skus.csv'
\set photofile :raw_data_dir '/photos.csv'
\set relatedfile :raw_data_dir '/related.csv'

COPY products
  FROM :'productfile'
  DELIMITER ',' CSV HEADER;

COPY features
  FROM :'featurefile'
  DELIMITER ',' CSV HEADER;

COPY styles
  FROM :'stylefile'
  DELIMITER ',' CSV HEADER;

COPY skus
  FROM :'skufile'
  DELIMITER ',' CSV HEADER;

COPY photos
  FROM :'photofile'
  DELIMITER ',' CSV HEADER;

COPY temp_related_products
  FROM :'relatedfile'
  DELIMITER ',' CSV HEADER;

DELETE FROM temp_related_products WHERE current_product_id = '0';
DELETE FROM temp_related_products WHERE related_product_id = '0';

INSERT INTO related_products SELECT * FROM temp_related_products;

DROP TABLE temp_related_products;


-- Update statements for the products table
UPDATE products
SET name = '' WHERE name = 'null';

UPDATE products
SET slogan = '' WHERE slogan = 'null';

UPDATE products
SET description = '' WHERE description = 'null';

UPDATE products
SET category = '' WHERE category = 'null';

UPDATE products
SET default_price = '0' WHERE default_price = 'null';


-- Update statements for the features table
UPDATE features
SET feature = '' WHERE feature = 'null';

UPDATE features
SET value = '' WHERE value = 'null';


-- Update statements for the styles table
UPDATE styles
SET name = '' WHERE name = 'null';

UPDATE styles
SET sale_price = '0' WHERE sale_price = 'null';

UPDATE styles
SET original_price = '0' WHERE original_price = 'null';


-- Update statements for the skus table
UPDATE skus
SET size = '' WHERE size = 'null';


-- Update statements for the photos table
UPDATE photos
SET url = '' WHERE url = 'null';

UPDATE photos
SET thumbnail_url = '' WHERE thumbnail_url = 'null';
