const { db } = require("../utils/dbconnection");
const { ObjectId } = require("mongodb");
const favouritesCollection = db.collection("bookmarks");

// get all carts
const getAllFavs = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await favouritesCollection
      .find({ userId: userId })
      .toArray();
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

//add new fav
const addFav = async (req, res) => {
  const { userId, bookId, title, coverImage, tags, notes } = req.body;

  try {
    // Connect to the database
    await client.connect();
    const database = client.db(databaseName);
    const favoritesCollection = database.collection(collectionName);

    // Build the new bookmark
    const newBookmark = {
      bookId,
      title,
      coverImage,
      tags: tags || [], // Default to empty array if tags are not provided
      notes: notes || "", // Default to empty string if notes are not provided
      createdAt: new Date(),
    };

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
  } finally {
    await client.close();
  }
};
//remove from fav

module.exports = { getAllFavs, addFav };
