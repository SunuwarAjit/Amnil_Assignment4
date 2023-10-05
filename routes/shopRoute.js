const express = require("express");
const router = express.Router();

const {
  getShops,
  getShop,
  createShop,
  findNearest

} = require("../modules/Shop/shopController");

router.get("/", getShops);
router.post("/create", createShop);
router.post("/NearMe", findNearest);
router.get("/:id", getShop);
//router.delete("/:id", deleteShop);
//router.patch("/:id", updateShop);

module.exports = router;
