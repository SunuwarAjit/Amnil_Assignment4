const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
  {
    name: String,
    lname: String,
    username: String,
    password: String,
    age: Number,
    image: Buffer
    //image: { type: mongoose.Schema.Types.ObjectId, ref: "Images" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    //const passwordHash = await bcrypt.hash(password, 10);
    this.password = await bcrypt.hash(this.password, 10);
    
  }
  next();
})

//model
const Users = mongoose.model("Users", userSchema);
module.exports = Users;