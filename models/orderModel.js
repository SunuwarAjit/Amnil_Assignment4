const mongoose = require("mongoose");

//orderschema
const orderSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
        totalPrice: Number,
    },
    { timestamps: true }
  );
  
  //ordermodel
  const Orders = mongoose.model("Orders", orderSchema);

  module.exports = Orders;