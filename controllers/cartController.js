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
const addItemToCart = async (req, res) => {};

module.exports = { getAllCarts, addItemToCart };
