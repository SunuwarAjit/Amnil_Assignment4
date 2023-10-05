const Shops = require('../../models/shopModel')


exports.getShops = async (req, res) => {
    const shops = await Shops.find();
    res.status(200).send(shops);
  };
  
  
exports.getShop = async (req, res) => {
    const findShop = await Shops.findOne({ _id: req.params.id });
    res.send(findShop);
  };

  exports.createShop = async (req, res) => {
    const { userId, name, type, } = req.body;
    const newShop = new Shops({ userId, name, type,
        logo:{
        data:req.file.filename,
        contentType:'image/jpeg'
    }, 
        location:{
            type: req.body,
            coordinates: req.body
    }
    });
    await newProduct.save();
    res.status(200).send(`Product created ${newProduct}`);
  };