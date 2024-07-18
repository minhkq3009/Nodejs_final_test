const express = require('express');
const router = express.Router();
const Product = require('../model/products.model');

// Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ ProductStoreCode: -1 });
    res.render('index', { products });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Thêm sản phẩm mới
router.post('/', async (req, res) => {
  const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;
  const product = new Product({
    ProductCode,
    ProductName,
    ProductDate: new Date(ProductDate),
    ProductOriginPrice,
    Quantity,
    ProductStoreCode
  });

  try {
    await product.save();
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Xóa sản phẩm
router.post('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
