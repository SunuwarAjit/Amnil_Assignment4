const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    lname: String,
    age: Number,
    image:{
      data:Buffer,
      contentType: String
    }
    //image: { type: mongoose.Schema.Types.ObjectId, ref: "Images" },
  },
  { timestamps: true }
);

//model
const Users = mongoose.model("Users", userSchema);
module.exports = Users;