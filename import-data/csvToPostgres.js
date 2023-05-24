const fileToDb = require('./processFile');

module.exports = (dirPath, db) => ({
  products: () => fileToDb(`${dirPath}/product.csv`, async (id, name, slogan, description, category, defaultPrice) => {
    await db.query({
      text: 'INSERT INTO products(id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [id, name, slogan, description, category, defaultPrice],
    });
  }),

  features: () => fileToDb(`${dirPath}/features.csv`, async (id, productId, name, value) => {
    await db.query({
      text: 'INSERT INTO features(id, name, value) VALUES ($1, $2, $3)',
      values: [id, name, value],
    });
    await db.query({
      text: 'INSERT INTO features_products(product_id, feature_id) VALUES ($1, $2)',
      values: [productId, id],
    });
  }),

  styles: () => fileToDb(`${dirPath}/styles.csv`, async (id, productId, name, salePrice, originalPrice, defaultStyle) => {
    await db.query({
      text: 'INSERT INTO styles(id, product_id, name, original_price, sale_price, default_style) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [id, productId, name, originalPrice, salePrice, defaultStyle],
    });
  }),

  skus: () => fileToDb(`${dirPath}/skus.csv`, async (id, styleId, size, quantity) => {
    await db.query({
      text: 'INSERT INTO skus(id, quantity, size, style_id) VALUES ($1, $2, $3, $4)',
      values: [id, quantity, size, styleId],
    });
  }),

  photos: () => fileToDb(`${dirPath}/photos.csv`, async (id, styleId, url, thumbnailUrl) => {
    await db.query({
      text: 'INSERT INTO photos(id, url, thumbnail_url) VALUES ($1, $2, $3)',
      values: [id, url, thumbnailUrl],
    });

    await db.query({
      text: 'INSERT INTO photos_styles(photo_id, style_id) VALUES ($1, $2)',
      values: [id, styleId],
    });
  }),

  related: () => fileToDb(`${dirPath}/related.csv`, async (id, productA, productB) => {
    if (typeof productA === 'number' && typeof productB === 'number') {
      await db.query({
        text: 'INSERT INTO related_products(id, product_a_id, product_b_id) VALUES ($1, $2, $3)',
        values: [id, productA, productB],
      });
    }
  }),

  cart: () => fileToDb(`${dirPath}/cart.csv`, async (id) => {
    await db.query({
      text: 'INSERT INTO cart_items(id, count) VALUES ($1, $2)',
      values: [id, 0],
    });

    await db.query({
      text: 'INSERT INTO cart_items_skus(sku_id, cart_items_id) VALUES ($1, $2)',
      values: [1, id],
    });
  }),
});
