const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

// Lấy tất cả sản phẩm
router.get('/', productController.getAllProducts);

// Thêm sản phẩm mới
router.post('/', productController.addProduct);

// Xóa sản phẩm
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;
