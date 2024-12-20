const { db } = require("../utils/dbconnection");
const { ObjectId } = require("mongodb");
const cartsCollection = db.collection("carts");

// get all carts
const getAllCarts = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cart = await cartsCollection.findOne({ userId: ObjectId(userId) });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//add item to cart
const addItemToCart = async (req, res) => {
  const { userId, bookId, title, quantity, price, image } = req.body;

  try {
    // Find the user's cart
    let cart = await cartsCollection.findOne({ userId: ObjectId(userId) });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      const newCart = {
        userId: ObjectId(userId),
        items: [
          {
            bookId: ObjectId(bookId),
            title,
            quantity,
            price,
            image,
          },
        ],
      };

      await cartsCollection.insertOne(newCart);
      return res.status(201).json(newCart);
    }

    // If the cart exists, check if the item is already in the cart
    const existingItem = cart.items.find(
      (item) => item.bookId.toString() === bookId
    );

    if (existingItem) {
      // Update the quantity of the existing item
      existingItem.quantity += quantity;

      // Remove the item if the quantity becomes 0 or less
      if (existingItem.quantity <= 0) {
        cart.items = cart.items.filter(
          (item) => item.bookId.toString() !== bookId
        );
      }
    } else {
      // Add the new item to the cart
      cart.items.push({
        bookId: ObjectId(bookId),
        title,
        quantity,
        price,
        image,
      });
    }

    // Recalculate the total price
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    // Update the cart with the modified items and total price
    await cartsCollection.updateOne(
      { userId: ObjectId(userId) },
      { $set: { items: cart.items, totalPrice } }
    );

    // Return the updated cart
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { getAllCarts, addItemToCart };
