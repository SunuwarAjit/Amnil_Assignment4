const express = require("express");
const router = express.Router();
const upload = require("../helpers/imageUpload")
const auth = require('../middleware/jwtauthentication')

const {
  getShops,
  getShop,
  createShop,
  findNearest,
  deleteShop,
  updateShop

} = require("../modules/Shop/shopController");

router.get("/", getShops);
router.post("/create",upload, createShop);
router.post("/nearme", findNearest);
router.get("/:id", getShop);
router.delete("/:id", deleteShop);
router.patch("/:id", updateShop);

module.exports = router;
