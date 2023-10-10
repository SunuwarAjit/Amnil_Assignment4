const mongoose = require("mongoose");

//schema
const shopSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, 
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}],
    name: String,
    logo: {
      data:Buffer
    },
    type: {
        type: String,
        enum: ["Electronics", "Grocery", "Clothing", "Stationery", "Fastfood"],
        default: "General"},
    
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        default:'Point',
        required: true
      },
      coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere'
      }
    
    },
}

);

//shopSchema.index({location:"2dsphere"})

//model
const Shops = mongoose.model("Shop", shopSchema);
module.exports = Shops;