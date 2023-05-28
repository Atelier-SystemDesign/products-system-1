const router = require('express').Router();
const { products, styles, related } = require('./controllers');

router.get('/products', products.getAll);

router.get('/products/:product_id', products.getOne);

router.get('/products/:product_id/styles', styles.get);

router.get('/products/:product_id/related', related.get);

module.exports = router;
