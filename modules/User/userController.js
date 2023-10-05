const Users = require("../../models/userModel");

exports.getUsers = async (req, res) => {
  const users = await Users.find();
  res.status(200).send(users);
};

exports.getUser = async (req, res) => {
  const findUser = await Users.findOne({ _id: req.params.id });
  res.send(findUser);
};

exports.createUser = async (req, res) => {
  const { name, lname, age } = req.body;
  const newUser = new Users({ name, lname, age,
    image:{
    data:req.file.filename,
    contentType:'image/jpeg'
  } });
  await newUser.save();
  res.status(200).send(`User created ${newUser}`);
};

exports.deleteUser = async (req, res) => {
  const user = await Users.findOneAndDelete({ _id: req.params.id });
  //user.save();
  res.send(`User ${user.name} deleted`);
};

exports.updateUser = async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  if (!user) throw new Error("User not found");
  const newUser = req.body;
  user = {
    ...newUser,
    ...user,
  };
  user.save();
  res.send(`User ${user.id} updated`);
};
