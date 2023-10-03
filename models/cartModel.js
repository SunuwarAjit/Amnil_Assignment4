const mongoose = require("mongoose");

//cartschema
const cartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    products: [
        {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: Number,
        },]
    },
  { timestamps: true }
);

//cartmodel
const Carts = mongoose.model("Carts", cartSchema);

module.exports = Carts;