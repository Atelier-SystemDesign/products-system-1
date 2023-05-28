# echo Now stressing the ENDPOINT /api/products
# k6 run ./k6/products.js

# echo Now stressing the ENDPOINT /api/products/:product_id
# k6 run ./k6/product.js

# echo Now stressing the ENDPOINT /api/products/:product_id/related
# k6 run ./k6/related.js

echo Now stressing the ENDPOINT /api/products/:product_id/styles
k6 run ./k6/styles.js