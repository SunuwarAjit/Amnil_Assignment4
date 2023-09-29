import express from "express";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

let users = [
  //   {
  //     name: "Jhon",
  //     lname: "Wick",
  //     age: 24,
  //   },
  //   {
  //     name: "Piper",
  //     lname: "Peter",
  //     age: 24,
  //   },
];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;
  const userID = uuidv4();
  const userWithID = { ...user, id: userID };
  users.push(userWithID);
  res.send(`User ${user.name} added to database`);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const findUser = users.find((user) => user.id == id);
  res.send(findUser);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id !== id);
  res.send(`User ${id} deleted`);
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;

  const userToUpdate = users.find((user) => user.id == id);
  const { name, lname, age } = req.body;
  if (name) {
    userToUpdate.name = name;
  }
  if (lname) {
    userToUpdate.lname = lname;
  }
  if (age) {
    userToUpdate.age = age;
  }
  res.send(`User ${id} has been updated`);
});

export default router;
