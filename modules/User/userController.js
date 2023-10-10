const Users = require("../../models/userModel");
const bcrypt = require("bcrypt")
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message)
  }
};

exports.getUser = async (req, res) => {
  const findUser = await Users.findOne({ _id: req.params.id });
  res.send(findUser);
};

exports.createUser = async (req, res) => {
  try {
    const { name, lname, age, username, password } = req.body;
    const image = req.file.filename 
    const findUsername = await Users.findOne({ username: req.body.username});
    if(findUsername) {
      res.send({success:false, msg:`"Username already taken, try a new one"`});
    }
    else{
      const newUser = new Users({ name, lname, age, username, password,
      image
      });
      await newUser.save();
      res.status(200).send(`User created ${newUser}`);
    }
  }

   catch (error) {
    res.status(400).send("Invalid details")
   }
    
    
};

exports.login = async (req,res)=>{
 try {
  const {username, password} = req.body;
  const user = await Users.findOne({username})
  const passwordMatch = await bcrypt.compare(password, user.password )
  if(!passwordMatch) {res.send("Invalid login details");}
  
  const data = {name: username};
  const token = jwt.sign(data, process.env.ACCESS_TOKEN)
  res.send({token: token})
 } catch (error) {
  res.status(400).send("Invalid details")
 }
}

exports.deleteUser = async (req, res) => {
  const user = await Users.findOneAndDelete({ _id: req.params.id });
  //user.save();
  res.send(`User ${user.name} deleted`);
};

exports.updateUser = async (req, res) => {
  let user = await Users.findOne({ _id: req.params.id });
  if (!user) throw new Error("User not found");
  const newUser = new Users (req.body);
  user = {
    ...user,
    ...newUser,
  };
  console.log(user);
  //user.save();
  res.send(`User ${user.id} updated`);
};
