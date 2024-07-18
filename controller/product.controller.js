const Product = require('../model/products.model');

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ ProductStoreCode: -1 });
    res.render('index', { products });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
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
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err);
  }
};
