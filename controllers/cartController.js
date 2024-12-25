const { db } = require("../utils/dbconnection");
const { ObjectId } = require("mongodb");
const cartsCollection = db.collection("carts");

// get all carts
const getAllCarts = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const cart = await cartsCollection.findOne({
      userId: new ObjectId(String(userId)),
    });

    // if (!cart) {
    //   return res.status(404).json({ message: "Cart not found" });
    // }

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//add item to cart
const addItemToCart = async (req, res) => {
  const userId = req.params.userId;
  const newItem = req.body;
  const query = { userId: new ObjectId(String(userId)) };

  try {
    let cart = await cartsCollection.findOne(query);

    // If cart exists, update it by adding the item
    if (cart) {
      const itemExists = cart.items.some(
        (item) => item.bookId === newItem.bookId
      );

      if (itemExists) {
        return res
          .status(409)
          .send({ message: "Item is already in the cart." });
      }

      // Update the cart to add the new item and update the itemsIdArray
      const result = await cartsCollection.updateOne(
        { userId: new ObjectId(String(userId)) },
        {
          $push: { items: newItem, itemsIdArray: newItem.bookId },
        }
      );

      return res.status(200).json({ message: "Item added to cart :", result });
    }

    // If cart doesn't exist, create a new one
    const newCart = {
      userId: new ObjectId(String(userId)),
      items: [newItem], // Ensure it's an array
      itemsIdArray: [newItem.bookId], // Initialize with the bookId of the first item
    };

    const result = await cartsCollection.insertOne(newCart);
    return res.status(201).json({ message: "Item added to cart :", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//remove item from cart
const removeitemFromCart = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    // Find the user's cart
    const cart = await cartsCollection.findOne({
      userId: new ObjectId(String(userId)),
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item to remove
    const updatedItems = cart.items.filter((item) => item.bookId !== bookId);
    const updatedItemsIdArray = cart.itemsIdArray.filter(
      (itemId) => itemId !== bookId
    );

    // Update the cart in the database
    const result = await cartsCollection.updateOne(
      { userId: new ObjectId(String(userId)) },
      {
        $set: {
          items: updatedItems,
          itemsIdArray: updatedItemsIdArray,
        },
      }
    );

    // Send the updated cart as a response
    res
      .status(200)
      .json({ items: updatedItems, itemsIdArray: updatedItemsIdArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { getAllCarts, addItemToCart, removeitemFromCart };
