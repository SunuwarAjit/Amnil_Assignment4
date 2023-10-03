const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  outOfStock,
} = require("../modules/Product/productController");

const router = express.Router();

router.get("/", getProducts);
router.post("/create", createProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);
router.get("/pd/outofstock", outOfStock);

module.exports = router;
