const fileToDb = require('./processFile');

module.exports = (dirPath, db) => {

  console.log(`${dirPath}/product.csv`);
  return {
    product: () => {
      const filePath = 'product.csv';
      return db.run(`LOAD CSV WITH HEADERS FROM "file:///raw_data/${filePath}" AS row
        CREATE (:Product {id: row.id, name: row.name, slogan: row.slogan, description: row.description, category: row.category, default_price: row.defaultPrice })`);
    },

    feature: () => {
      const filePath = 'features.csv';
      return db.run(`LOAD CSV WITH HEADERS FROM "file:///raw_data/${filePath}" AS row
        CREATE (:Feature {id: row.id, name: row.name, value: row.value})
        WITH row
        MATCH (p:Product {id: row.productId})
        CREATE (p)-[:HAS_FEATURE]->(f)`, {});
    },

    style: () => {
      const filePath = 'styles.csv';
      return db.run(`LOAD CSV WITH HEADERS FROM "file:///raw_data/${filePath}" AS row
        CREATE (:Style {id: row.id, name: row.name, original_price: row.originalPrice, salePrice: row.salePrice, default_style: row.defaultStyle})
        WITH row
        MATCH (p:Product {id: row.productId})
        CREATE (p)-[:HAS_STYLE]->(s)`, {});
    },

    sku: () => {
      const filePath = 'skus.csv';
      return db.run(`LOAD CSV WITH HEADERS FROM "file:///raw_data/${filePath}" AS row
        CREATE (:Sku {id: row.id, quantity: row.quantity, size: row.size})
        WITH row
        MATCH (y:Style {id: row.styleId})
        CREATE (y)-[:HAS_SKU]->(s)`, {});
    },

    photos: () => {
      const filePath = 'photos.csv';
      return db.run(`LOAD CSV WITH HEADERS FROM "file:///raw_data/${filePath}" AS row
        CREATE (:Photo {id: row.id, url: row.url, thumbnail_url: row.thumbnailUrl})
        WITH row
        MATCH (s:Style {id: row.styleId})
        CREATE (s)-[:HAS_PHOTO]->(p)`, {});
    },

    related: () => {
      const filePath = 'related.csv';
      return db.run(`LOAD CSV WITH HEADERS FROM "file:///raw_data/${filePath}" AS row
        MATCH (a:Product {id: row.productA}), (b:Product {id: row.productB})
        CREATE (a)-[r:IS_RELATED_ITEM {id: row.id}]->(b)`, {});
    },

    cart: () => {
      const filePath = 'cart.csv';
      return db.run(`LOAD CSV WITH HEADERS FROM "file:///raw_data/${filePath}" AS row
        CREATE (:Cart {id: row.id, count: 0})
        WITH row
        MATCH (c:Cart {id: row.id}), (s:Sku {id: 1})
        CREATE (c)-[:HAS_SKU]->(s)`, {});
    },
  };
};

// module.exports = (dirPath, db) => ({
//   product: () => fileToDb(`${dirPath}/product.csv`, async (id, name, slogan, description, category, defaultPrice) => {
//     const result = await db.run(`
//       CREATE (:Product {id: $id, name: $name, slogan: $slogan, description: $description, category: $category, default_price: $defaultPrice })
//     `, { id, name, slogan, description, category, defaultPrice });
//   }),

//   feature: () => fileToDb(`${dirPath}/features.csv`, async (id, productId, name, value) => {
//     await db.run('CREATE (:Feature {id: $id, name: $name, value: $value})', { id, name, value });

//     await db.run(`
//       MATCH (p:Product {id: $productId}), (f:Feature {id: $id})
//       CREATE (p)-[:HAS_FEATURE]->(f)
//     `, { productId, id });
//   }),

//   style: () => fileToDb(`${dirPath}/styles.csv`, async (id, productId, name, salePrice, originalPrice, defaultStyle) => {
//     await db.run('CREATE (:Style {id: $id, name: $name, original_price: $originalPrice, salePrice: $salePrice, default_style: $defaultStyle})', { id, name, originalPrice, salePrice, defaultStyle });

//     await db.run(`
//       MATCH (p:Product {id: $productId}), (s:Style {id: $id})
//       CREATE (p)-[:HAS_STYLE]->(s)
//     `, { productId, id });
//   }),

//   sku: () => fileToDb(`${dirPath}/skus.csv`, async (id, styleId, size, quantity) => {
//     await db.run('CREATE (:Sku {id: $id, quantity: $quantity, size: $size})', { id, quantity, size });
//     await db.run(`
//       MATCH (y:Style {id: $styleId}), (s:Sku {id: $id})
//       CREATE (y)-[:HAS_SKU]->(s)
//     `, { styleId, id });
//   }),

//   photos: () => fileToDb(`${dirPath}/photos.csv`, async (id, styleId, url, thumbnailUrl) => {
//     await db.run('CREATE (:Photo {id: $id, url: $url, thumbnail_url: $thumbnailUrl})', { id, url, thumbnailUrl });
//     await db.run(`
//       MATCH (p:Photo {id: $id}), (s:Style {id: $styleId})
//       CREATE (s)-[:HAS_PHOTO]->(p)
//     `, { id, styleId });
//   }),

//   related: () => fileToDb(`${dirPath}/related.csv`, async (id, productA, productB) => {
//     await db.run(`
//       MATCH (a:Product {id: $productA}), (b:Product {id: $productB})
//       CREATE (a)-[r:IS_RELATED_ITEM {id: $id}]->(b)
//     `, { id, productA, productB });
//   }),

//   cart: () => fileToDb(`${dirPath}/cart.csv`, async (id) => {
//     await db.run('CREATE (:Cart {id: $id, count: 0})', { id });
//     await db.run(`
//       MATCH (c:Cart {id: $id}), (s:Sku {id: 1})
//       CREATE (c)-[:HAS_SKU]->(s)
//     `, { id });
//   }),
// });
