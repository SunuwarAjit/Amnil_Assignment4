const mongoose = require("mongoose");

//schema
const productSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    desc: String,
    quantity: Number,
    type: String,
    image:{
      data:Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

//model
const Products = mongoose.model("Products", productSchema);

module.exports = Products;