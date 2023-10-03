const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    lname: String,
    age: Number,
  },
  { timestamps: true }
);

//model
const Users = mongoose.model("Users", userSchema);
module.exports = Users;