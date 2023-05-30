module.exports.generateCacheKey = (req) => {
  const { originalUrl } = req;
  const { page, count } = req.query;
  const productId = req.params.product_id;

  let cacheKey = '';

  switch (originalUrl) {
    case '/products':
      cacheKey = `products_page_${page}_count_${count}`;
      break;
    case `/products/${productId}`:
      cacheKey = `product_${productId}`;
      break;
    case `/products/${productId}/styles`:
      cacheKey = `product_styles_${productId}`;
      break;
    case `/products/${productId}/related`:
      cacheKey = `product_related_${productId}`;
      break;
    default:
      cacheKey = originalUrl;
      break;
  }

  return cacheKey;
};
