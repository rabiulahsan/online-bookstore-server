const { db } = require("../utils/dbconnection");
const { ObjectId } = require("mongodb");
const favoritesCollection = db.collection("bookmarks");

// get all carts
const getAllFavs = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await favoritesCollection.find({ userId: userId }).toArray();
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

//add new fav
const addFav = async (req, res) => {
  const {
    userId,
    bookId,
    title,
    author,
    image,
    tags,
    category,
    rating,
    price,
    discount,
  } = req.body;

  try {
    // Build the new bookmark
    const newBookmark = {
      bookId,
      title,
      image,
      author,
      rating,
      price,
      tags: tags || [], // Default to empty array if tags are not provided
      category: category || [], // Default to empty string if notes are not provided
      discount,
    };

    newBookmark.created_at = new Date().toISOString();

    // Add the new bookmark to the user's favorites
    const result = await favoritesCollection.updateOne(
      { userId: userId }, // Filter by userId
      { $push: { bookmarks: newBookmark } }, // Push the new bookmark to bookmarks array
      { upsert: true } // Create a new document if it doesn't exist
    );

    res.json({ message: "Favorite added successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding favorite", error });
  }
};

//remove from fav
const removeFav = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    // Remove the bookmark
    const result = await favoritesCollection.updateOne(
      { userId: userId }, // Filter by userId
      { $pull: { bookmarks: { bookId: bookId } } } // Remove the matching bookmark
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Favorite not found or already removed" });
    }

    res.json({ message: "Favorite removed successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing favorite", error });
  }
};

module.exports = { getAllFavs, addFav, removeFav };
