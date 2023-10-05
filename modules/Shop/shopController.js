const Shops = require('../../models/shopModel')
const Users = require('../../models/userModel')


exports.getShops = async (req, res) => {
    const shops = await Shops.find();
    res.status(200).send(shops);
  };
  
  
exports.getShop = async (req, res) => {
    const findShop = await Shops.findOne({ _id: req.params.id });
    res.send(findShop);
  };

exports.createShop = async (req, res) => {
    try {
      const userData = Users.findOne({_id:req.body.userId})
      const shopExists = await Shops.findOne({user:req.body.user})
      if (shopExists) {
        res.send({success:false, msg:`Shop for user already Exists`})
      }
      else {
        const { user, name, type, } = req.body;
        const newShop = new Shops({ user, name, type,
          logo:{
          data:req.file.filename,
          contentType:'image/jpeg'
          }, 
          location:{
              type: "Point",
              coordinates: [parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
          }
        });

        await newShop.save();
        res.status(200).send(`Shop created ${newShop}`);
      }
    }
    
    catch (error) {
      res.status(400).send(error.message);
    }
  };


exports.findNearest = async(req,res)=>{

  try {
    
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const distance = req.body.distance || 1000

    const nearShops = await Shops.aggregate([
      {
      $geoNear:{
        near:{type:"Point", coordinates:[parseFloat(longitude), parseFloat(latitude)]},
        //key:"location",
        distanceField: 'distance',
        maxDistance: parseFloat(distance),
        spherical:true }
      }
    ]);

    res.status(200).send({success:true, msg:"Store Details", data:nearShops})

  } catch (error) {
    res.status(400).send({success:false, msg:error.message})
  }
  
}