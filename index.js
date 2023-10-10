const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/usersRoute.js");
const productRouter = require("./routes/productsRoute.js");
const orderRouter = require("./routes/ordersRoute.js");
const shopRouter = require("./routes/shopRoute.js");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use("/users",  userRouter);
app.use("/products",  productRouter);
app.use("/orders", orderRouter);
app.use("/shops", shopRouter);


app.get("/", (req, res) => {
  res.send("HOME");
});

const connectDB = async () => {
  const connect = mongoose.connect(process.env.MONGODB_URI);
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


app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));


