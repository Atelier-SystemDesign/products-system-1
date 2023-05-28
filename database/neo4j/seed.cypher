// Load Products
LOAD CSV WITH HEADERS FROM 'file:///product.csv' AS line
MERGE (p:Product {id: toInteger(line.id)})
SET p.name = line.name,
    p.slogan = line.slogan,
    p.description = line.description,
    p.category = line.category,
    p.default_price = line.default_price;

// Load Features
LOAD CSV WITH HEADERS FROM 'file:///features.csv' AS line
MATCH (p:Product {id: toInteger(line.product_id)})
MERGE (f:Feature {id: toInteger(line.id)})
ON CREATE SET f.name = line.name, f.value = line.value
MERGE (p)-[:HAS_FEATURE]->(f);

// Load Styles
LOAD CSV WITH HEADERS FROM 'file:///styles.csv' AS line
MATCH (p:Product {id: toInteger(line.productId)})
MERGE (s:Style {id: toInteger(line.id)})
ON CREATE SET s.name = line.name, s.sale_price = line.sale_price,
             s.original_price = line.original_price, s.default_style = toBoolean(line.default_style)
MERGE (p)-[:HAS_STYLE]->(s);

// Load Skus
LOAD CSV WITH HEADERS FROM 'file:///skus.csv' AS line
MATCH (s:Style {id: toInteger(line.styleId)})
MERGE (sku:Sku {id: toInteger(line.id)})
ON CREATE SET sku.size = line.size, sku.quantity = toInteger(line.quantity)
MERGE (s)-[:HAS_SKU]->(sku);

// Load Photos
LOAD CSV WITH HEADERS FROM 'file:///photos.csv' AS line
MATCH (s:Style {id: toInteger(line.styleId)})
MERGE (ph:Photo {id: toInteger(line.id)})
ON CREATE SET ph.url = line.url, ph.thumbnail_url = line.thumbnail_url
MERGE (s)-[:HAS_PHOTO]->(ph);

// Load Related Products
LOAD CSV WITH HEADERS FROM 'file:///related.csv' AS line
MATCH (p1:Product {id: toInteger(line.current_product_id)}),
      (p2:Product {id: toInteger(line.related_product_id)})
MERGE (p1)-[:RELATED_TO]->(p2);