const multer = require('multer');
const Images = require("../models/imageModel.js");
const path = require('path');

const isImage = (file) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  return allowedExtensions.includes(fileExtension);
};

//multer storage
const Storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads',)},
  filename:(req,file,cb)=>{
    cb(null, Date.now() + "--" + file.originalname);}
})
//multer middleware
const upload = multer({
  storage:Storage,
  fileFilter: (req, file, cb) => {
    if (isImage(file)) {
        cb(null, true);
    } else {
        cb(new Error(`Only image files are allowed`));
    }
  }
}).single('imgFile');



module.exports = upload;






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