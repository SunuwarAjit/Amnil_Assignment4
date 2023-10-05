const mongoose = require("mongoose");

//schema
const shopSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, 
    name: String,
    logo: {
      data:Buffer,
      contentType: String
    },
    type: {
        type: String,
        enum: ["Electonics", "Grocery", "Clothing", "Stationery"],
        default: "General"},
    quantity: Number,
    location: {
      type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
      coordinates: {
      type: [Number],
      required: true
    }
    
    },
}

);

//model
const Shops = mongoose.model("Shop", shopSchema);

module.exports = Shops;