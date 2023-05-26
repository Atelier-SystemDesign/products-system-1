
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
