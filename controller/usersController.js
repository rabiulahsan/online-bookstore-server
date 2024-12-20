const { db } = require("../utils/dbconnection");
const { ObjectId } = require("mongodb");
const usersCollection = db.collection("users");

//get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await usersCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
