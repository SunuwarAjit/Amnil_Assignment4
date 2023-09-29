const bodyParser = require("body-parser");
const fs = require("fs");
let orders = require("../orders.json");
const carts = require("../carts.json");
const products = require("../products.json");

const path = require("path");

const updateCarts = path.join(__dirname, "../carts.json");

function saveDataToCart(carts) {
  fs.writeFileSync(updateCarts, JSON.stringify(carts, null, 2));
}

const updateOrders = path.join(__dirname, "../orders.json");

function saveDataToOrder(orders) {
  fs.writeFileSync(updateOrders, JSON.stringify(orders, null, 2));
}

exports.getOrders = (req, res) => {
  res.send(orders);
};

exports.getCart = (req, res) => {
  const id = req.params.id;
  const findCart = carts.find((c) => c.id == id);
  res.send(findCart);
};
exports.getCarts = (req, res) => {
  console.log("all carts");
  res.send(carts);
};

exports.getOrder = (req, res) => {
  const id = req.params.id;
  const findOrder = orders.find((order) => order.id == id);
  res.send(findOrder);
};

exports.addToCart = (req, res) => {
  const newCart = req.body;

  const cartAlreadyPresent = carts.find(
    (cart) => cart.user_id === req.body.user_id
  );

  //if cart already present, update the cart
  if (cartAlreadyPresent) {
    const presentIndex = carts.indexOf(cartAlreadyPresent);

    // Loop through to check wheather there is existing items or new items of existing user
    newCart.items.forEach((item) => {
      const existingItemIndex = cartAlreadyPresent.items.findIndex(
        (t) => t.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Item already exists, increase its quantity
        cartAlreadyPresent.items[existingItemIndex].quantity += item.quantity;
      } else {
        // Item doesn't exist, push new item to the existing users items
        cartAlreadyPresent.items.push(item);
      }
    });

    //calculating the total price of products
    cartAlreadyPresent.total_price = cartAlreadyPresent.items
      .reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.quantity;
      }, 0)
      .toFixed(2);

    carts[presentIndex] = cartAlreadyPresent;

    // fs.writeFile(updateCarts, JSON.stringify(carts, null, 2), "utf8", (err) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).send("Internal server error");
    //   }
    //   return res.status(200).send(cartAlreadyPresent);

    //  };
    saveDataToCart(carts);
    res.send(`Added to existing cart ${cartAlreadyPresent.id}`);
  } else {
    carts.push(newCart);

    const index = carts.indexOf(newCart);
    const userCart = carts[index];

    //calculating the total price of the products
    userCart.total_price = userCart.items
      .reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.quantity;
      }, 0)
      .toFixed(2);

    carts[index] = userCart;

    fs.writeFile(updateCarts, JSON.stringify(carts, null, 2), "utf8", (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      res.status(201).send(`Item added to New cart`);
    });
  }
};

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
