const express = require("express");
const router = express.Router();
const upload = require("../helpers/imageUpload")
const jwtAuth = require("../middleware/jwtauthentication");

const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  login
} = require("../modules/User/userController");

router.get("/",jwtAuth, getUsers);
router.post("/create", upload, createUser);
router.get("/:id",  getUser);
router.post("/login", login);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.exports = router;
