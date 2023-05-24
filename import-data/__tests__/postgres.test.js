/* eslint-env jest */

const { newDb } = require('pg-mem');
const csvToDatabase = require('../csvToPostgres');

describe('CSV data cleaning and transforming to PostgreSQL', () => {
  let db;
  let tables;
  beforeAll(async () => {

  });

  it('database should hold correct product information', async () => {
    const result = await db.public.many('SELECT * FROM products');
    expect(result).toEqual([{
      id: 1,
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140',
    },
    {
      id: 2,
      name: 'Bright Future Sunglasses',
      slogan: 'You\'ve got to wear shades',
      description: 'Where you\'re going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.',
      category: 'Accessories',
      default_price: '69',
    }]);
  });

  it('database should hold correct feature information', () => {
    const result = db.public.many('SELECT * FROM features');
    expect(result).toEqual([{
      id: 1,
      name: 'Fabric',
      value: 'Canvas',
    },
    {
      id: 2,
      name: 'Buttons',
      value: 'Brass',
    }]);
  });

  it('database should hold correct features_products information', () => {
    const result = db.public.many('SELECT * FROM features_products');
    expect(result).toEqual([{
      id: 1,
      product_id: 1,
      feature_id: 1,
    },
    {
      id: 2,
      product_id: 1,
      feature_id: 2,
    }]);
  });

  it('database should hold correct styles information', () => {
    const result = db.public.many('SELECT * FROM styles');
    expect(result).toEqual([{
      id: 1,
      product_id: 1,
      name: 'Forest Green & Black',
      original_price: '140',
      sale_price: '',
      default_style: true,
    },
    {
      id: 2,
      product_id: 1,
      name: 'Desert Brown & Tan',
      original_price: '140',
      sale_price: '',
      default_style: false,
    }]);
  });

  it('database should hold correct skus information', () => {
    const result = db.public.many('SELECT * FROM skus');
    expect(result).toEqual([{
      id: 1,
      quantity: 8,
      size: 'XS',
      style_id: 1,
    },
    {
      id: 2,
      quantity: 16,
      size: 'S',
      style_id: 1,
    }]);
  });

  it('database should hold correct photos information', () => {
    const result = db.public.many('SELECT * FROM photos');
    expect(result).toEqual([{
      id: 1,
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    }]);
  });

  it('database should hold correct photos_styles information', () => {
    const result = db.public.many('SELECT * FROM photos_styles');
    expect(result).toEqual([{
      id: 1,
      photo_id: 1,
      style_id: 1,
    },
    {
      id: 2,
      photo_id: 2,
      style_id: 1,
    }]);
  });

  // related_products: new Table({
  //   name: 'related_products',
  //   columns: ['id', 'product_a_id', 'product_b_id'],
  // }),

  // cart_items: new Table({
  //   name: 'cart_items',
  //   columns: ['id'],
  // }),

  // cart_items_skus: new Table({
  //   name: 'cart_items_skus',
  //   columns: ['id', 'sku_id', 'cart_items_id'],
  // }),

  it('database should hold correct related_products information', () => {
    const result = db.public.many('SELECT * FROM related_products');
    expect(result).toEqual([{
      id: 1,
      product_a_id: 1,
      product_b_id: 2,
    },
    {
      id: 2,
      product_a_id: 1,
      product_b_id: 3,
    }]);
  });

  it('database should hold correct cart_items information', () => {
    const result = db.public.many('SELECT * FROM cart_items');
    expect(result).toEqual([{
      id: 1,
      count: 0,
    },
    {
      id: 2,
      count: 0,
    }]);
  });

  it('database should hold correct cart_items_skus information', () => {
    const result = db.public.many('SELECT * FROM cart_items_skus');
    expect(result).toEqual([{
      id: 1,
      sku_id: 1,
      cart_items_id: 1,
    },
    {
      id: 2,
      sku_id: 4,
      cart_items_id: 2,
    }]);
  });
});
