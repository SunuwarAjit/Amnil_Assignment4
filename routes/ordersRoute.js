const express = require("express");
const {
  getOrders,
  getOrder,
  addToCart,
  checkout,
  getCart,
  getCarts,
} = require("../controllers/Orders.js");

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.get("/cart/:id", getCart);
router.get("/cart/all", getCarts);
router.post("/cart/add", addToCart);
router.post("/cart/checkout/:cartId", checkout);

module.exports = router;
