const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/usersRoute.js");
const productRouter = require("./routes/productsRoute.js");
const orderRouter = require("./routes/ordersRoute.js");
const shopRouter = require("./routes/shopRoute.js");
const Images = require("./models/imageModel.js");
const mongoose = require("mongoose");
const multer = require('multer');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(bodyParser.json());

//multer storage
const Storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads',)},
  filename:(req,file,cb)=>{
  cb(null, Date.now() + "--" + file.originalname);}
})
//multer middleware
const upload = multer({
  storage:Storage})
  .single('imgFile');

app.use("/users", upload, userRouter);
app.use("/products", upload, productRouter);
app.use("/orders", orderRouter);
app.use("/shops",upload, shopRouter);


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


/*app.post('/upload',(req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      console.log(err);
    }
    else{
      const newImage = new Images({
        name: req.body.name,
        image:{
          data:req.file.filename,
          contentType:'image/jpeg'
        }
      })
      newImage.save()
      .then(()=>res.send(`Image ${newImage.name} upload success`))
      .catch((err)=>console.log(err));
    }
  })
})*/

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
