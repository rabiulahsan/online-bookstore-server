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

//post a user while signing in
const postUser = async (req, res) => {
  const newUser = req.body;
  const query = { email: newUser.email };
  // console.log(query);
  try {
    // Check if the user already exists
    const exist = await usersCollection.findOne(query);
    if (exist) {
      return res.status(409).send({ message: "User already exists" });
    }
    // Insert new user
    const result = await usersCollection.insertOne(newUser);

    if (result.insertedId) {
      res.status(201).send({
        message: "User created successfully",
        userId: result.insertedId,
      });
    } else {
      res.status(500).send({ message: "Failed to create user" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};
module.exports = { getAllUsers, postUser };
