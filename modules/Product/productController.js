const Products = require("../../models/productModel");
const Images = require("../../models/imageModel");

exports.getProducts = async (req, res) => {
  const products = await Products.find();
  res.status(200).send(products);
};

exports.getProduct = async (req, res) => {
  const findProduct = await Products.findOne({ _id: req.params.id });
  res.send(findProduct);
};

exports.createProduct = async (req, res) => {
  const { id, name, price, desc, quantity, type } = req.body;
  const newProduct = new Products({ id, name, price, desc, quantity, type, image:{
    data:req.file.filename,
    contentType:'image/jpeg'
  } });
  await newProduct.save();
  res.status(200).send(`Product created ${newProduct}`);
};

exports.deleteProduct = async (req, res) => {
  const product = await Products.findOneAndDelete({ _id: req.params.id });
  //product.save();
  res.send(`Product ${product.name} deleted`);
};

exports.updateProduct = async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (!product) throw new Error("Product not found");
  const newProduct = req.body;
  product = {
    ...newProduct,
    ...product,
  };
  product.save();
  res.send(`Product ${product.id} updated`);
};

exports.outOfStock = async (req, res) => {
  const noProduct = await Products.find({ quantity: { $lt: 5 } });
  res.send(noProduct);
};
