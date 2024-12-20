const { db } = require("../utils/dbconnection");
const { ObjectId } = require("mongodb");
const favouritesCollection = db.collection("bookmarks");

// get all carts
const getAllFavs = async (req, res) => {
  try {
    const result = await favouritesCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

module.exports = { getAllFavs };
