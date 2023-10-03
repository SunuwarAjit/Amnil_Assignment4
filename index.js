// import express from "express";
// import bodyParser from "body-parser";
// import userRoutes from "./routes/users.js";
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/usersRoute.js");
const productRouter = require("./routes/productsRoute.js");
const orderRouter = require("./routes/ordersRoute.js");
const mongoose = require("mongoose");

const app = express();
const PORT = 5001;

//middleware
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("HOME");
});

const connectDB = async () => {
  const connect = mongoose.connect(
    "mongodb+srv://admin:mongodb12@cluster0.odh5zh4.mongodb.net/?retryWrites=true&w=majority"
  );
  await connect.then(
    (db) => {
      console.log("Mongoose: Successful connection");
    },
    (err) => {
      console.log("Mongoose: Connection failed");
    }
  );
};

connectDB();

app.listen(PORT, () => console.log("Server: http://localhost:5001"));
