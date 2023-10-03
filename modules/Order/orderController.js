const Orders = require("../../models/orderModel");
const Carts = require("../../models/cartModel");
const Users = require("../../models/userModel");
const Products = require("../../models/productModel");




exports.getOrders = async(req, res) => {
  const orders = await Orders.find();
  res.status(200).send(orders);
};

exports.getOrder = async(req, res) => {
  const order = await Orders.findOne({_id:req.params.id});
  res.status(200).send(order);
};

exports.getCarts = async(req, res) => {
  const carts = await Carts.find();
  res.status(200).send(carts);
};

exports.getCart = async(req, res) => {
  const cart = await Carts.findOne({_id:req.params.id});
  res.status(200).send(cart);
};


exports.addToCart = async(req, res) => {
  const products = req.body.products; //[{productId: xx, quantity: 23}]
  const userId = req.body.userId;
  if (!Array.isArray(products)) throw new Error(`Products must be an array`);
  let finalProds =[];
  
  // See if product is out of stock/invalid, then push 
  for (let product of products) {
    const prodExists = await Products.findOne({ _id: product.id });
    if (!prodExists) throw new Error(`Product does not exist`);
    if (prodExists.quantity < product.quantity)
      throw new Error(`Product ${prodExists.name} is out of stock`);

    finalProds.push({ productId: prodExists._id, quantity: product.quantity });
  }

  //If cart of user already present, 
  const prodwithIds = products.map((p) => p.id);
  const prevCart = await Carts.findOne({ userId });
  
  if (prevCart) {
    const existingProds = prevCart.products.filter((p) =>
      prodwithIds.includes(p._id)
    );
    // if (existingProds.length) {
    //   for (let prod of existingProds) {
    //     const index = prevCart.products.indexOf(
    //       (p) => p._id === prod.productId
    //     );
    //     prevCart.products[index].quantity = finalProds.filter(
    //       (p) => p._id === prod.productId
    //     );
    //   }
    // }
    const existingProdwithIDs = existingProds.map((p) => p._id);
    const remainingProds = finalProds.filter(
      (p) => !existingProdwithIDs.includes(p._id)
    );
    prevCart.products.push(...remainingProds);

    await prevCart.save();
    return res.json({ message: "Added to cart", data: prevCart });
  }

    else {
      const newCart = new Carts({ userId, products: finalProds });
      await newCart.save();
      return res.json({ message: "Added to cart", data: newCart });
    }

};

// exports.addToCart = (req, res) => {
//   const newCart = req.body;

//   const cartAlreadyPresent = Carts.find(
//     (cart) => cart.user_id === req.body.user_id
//   );

//   //if cart already present, update the cart
//   if (cartAlreadyPresent) {
//     const presentIndex = carts.indexOf(cartAlreadyPresent);

//     // Loop through to check wheather there is existing items or new items of existing user
//     newCart.items.forEach((item) => {
//       const existingItemIndex = cartAlreadyPresent.items.findIndex(
//         (t) => t.id === item.id
//       );

//       if (existingItemIndex !== -1) {
//         // Item already exists, increase its quantity
//         cartAlreadyPresent.items[existingItemIndex].quantity += item.quantity;
//       } else {
//         // Item doesn't exist, push new item to the existing users items
//         cartAlreadyPresent.items.push(item);
//       }
//     });

//     //calculating the total price of products
//     cartAlreadyPresent.total_price = cartAlreadyPresent.items
//       .reduce((acc, item) => {
//         const product = products.find((product) => product.id === item.id);
//         return acc + product.price * item.quantity;
//       }, 0)
//       .toFixed(2);

//     carts[presentIndex] = cartAlreadyPresent;

//     // fs.writeFile(updateCarts, JSON.stringify(carts, null, 2), "utf8", (err) => {
//     //   if (err) {
//     //     console.log(err);
//     //     return res.status(500).send("Internal server error");
//     //   }
//     //   return res.status(200).send(cartAlreadyPresent);

//     //  };
//     saveDataToCart(carts);
//     res.send(`Added to existing cart ${cartAlreadyPresent.id}`);
//   } else {
    
//     const index = carts.indexOf(newCart);
//     const userCart = carts[index];

//     //calculating the total price of the products
//     userCart.total_price = userCart.items
//       .reduce((acc, item) => {
//         const product = products.find((product) => product.id === item.id);
//         return acc + product.price * item.quantity;
//       }, 0)
//       .toFixed(2);

//     carts[index] = userCart;

//     // fs.writeFile(updateCarts, JSON.stringify(carts, null, 2), "utf8", (err) => {
//     //   if (err) {
//     //     console.log(err);
//     //     return res.status(500).send("Internal server error");
//     //   }
//     //   res.status(201).send(`Item added to New cart`);
//     // });
//   }
// };

exports.checkout = (req, res) => {
  const cartId = parseInt(req.params.cartId);

  const userCart = carts.find((cart) => cart.id === cartId);
  if (!userCart) {
    return res.status(404).send("Cart not found");
  }

  if (userCart.is_ordered) {
    return res.status(400).send("Cart already ordered");
  }

  if (userCart.total_price < 100) {
    return res
      .status(400)
      .send("Minimum threshold for total price of an order is 100");
  }

  const index = carts.indexOf(userCart);
  carts.splice(index, 1);

  const newOrder = {
    id: orders.length + 1,
    user_id: userCart.user_id,
    cart_id: cartId,
    items: userCart.items,
    total_price: userCart.total_price,
    order_status: "pending",
    order_date: new Date().toISOString().slice(0, 10),
  };

  orders.push(newOrder);

  fs.writeFile(updateOrders, JSON.stringify(orders, null, 2), "utf8", (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    fs.writeFile(updateCarts, JSON.stringify(carts, null, 2), "utf8", (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      res.status(201).send(newOrder);
    });
  });
};
