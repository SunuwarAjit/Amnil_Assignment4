import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

//middleware
app.use(bodyParser.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from HOME");
});

app.listen(PORT, () => console.log("Server: http://localhost:5000"));
