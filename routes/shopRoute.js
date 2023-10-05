const express = require("express");
const router = express.Router();

const {
  getShops,
  getShop

} = require("../modules/Shop/shopController");

router.get("/", getShops);
//router.post("/create", createShop);
router.get("/:id", getShop);
//router.delete("/:id", deleteShop);
//router.patch("/:id", updateShop);

module.exports = router;
