const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
    {
      name: String,
      image:{
        data:Buffer,
        contentType: String
      }
    },
    {timestamps: true}
);

const Images = mongoose.model("Images", imageSchema);
module.exports = Images;
