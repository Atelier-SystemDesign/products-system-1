const fileToDb = require('./processFile');

module.exports = (dirPath, db) => ({
  product: () => fileToDb(`${dirPath}/product.csv`, async (id, name, slogan, description, category, defaultPrice) => {
    db.run(`CREATE (:Product {id: ${id}, name: '${name}', slogan: '${slogan}', description: '${description}', category: '${category}', default_price: '${defaultPrice}' })`);
  }),

  feature: () => fileToDb(`${dirPath}/features.csv`, async (id, productId, name, value) => {
    db.run(`CREATE (:Feature {id: ${id}, name: '${name}', value: '${value}}')`);

    db.run(`
      MATCH (p:Product {id: ${productId}}), (f:Feature {id: ${id}})
      CREATE (p)-[:HAS_FEATURE]->(f)
    `);
  }),

  style: () => fileToDb(`${dirPath}/styles.csv`, async (id, productId, name, salePrice, originalPrice, defaultStyle) => {
    db.run(`CREATE (:Style {id: ${id}, name: '${name}', original_price: '${originalPrice}', salePrice: '${salePrice}', default_style: ${!!defaultStyle}})`);

    db.run(`
      MATCH (p:Product {id: ${productId}}), (s:Style {id: ${id}})
      CREATE (p)-[:HAS_STYLE]->(s)
    `);
  }),

  skus: () => fileToDb(`${dirPath}/skus.csv`, async (id, styleId, size, quantity) => {
    db.run(`CREATE (:Sku {id: ${id}, quantity: '${quantity}', size: '${size}'})`);
    db.run(`
      MATCH (y:Style {id: ${styleId}}), (s:Sku {id: ${id}})
      CREATE (y)-[:HAS_SKU]->(s)
    `);
  }),

  photos: () => fileToDb(`${dirPath}/photos.csv`, async (id, styleId, url, thumbnailUrl) => {
    db.run(`CREATE (:Photo {id: ${id}, url: '${url}', thumbnail_url: '${thumbnailUrl}'})`);
    db.run(`
      MATCH (p:Photo {id: ${id}}), (s:Style {id: ${styleId}})
      CREATE (s)->[:HAS_PHOTO]->(p)
    `);
  }),

  related: () => fileToDb(`${dirPath}/related.csv`, async (id, productA, productB) => {
    db.run(`
      MATCH (a:Product {id: ${productA}}), (b:Product {id: ${productB}})
      (a)->[r:IS_RELATED_ITEM {id: ${id}}]->(b)
    `);
  }),

  cart: () => fileToDb(`${dirPath}/cart.csv`, async (id) => {
    db.run(`CREATE (:Cart {id:${id}, count: 0})`);
    db.run(`
      MATCH (c:Cart {id: ${id}}), (s:Sku {id: 1})
      (c)->[:HAS_SKU]->(s)
    `);
  }),
});
