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

//get a specific user
const getSingleUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: "Id is required" });
  }

  const query = { _id: new ObjectId(String(id)) }; // Simplified query object creation
  //   console.log("Query:", query);

  try {
    const user = await usersCollection.findOne(query); // Find user by email
    if (user) {
      res.status(200).send(user); // Send user data if found
    } else {
      res.status(404).send({ message: "User not found" }); // Handle if user is not found
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

//get user role by email query
const isUser = async (req, res) => {
  const email = req.query.email;
  // console.log(email);

  // console.log(req.decoded);
  if (req.decoded.email !== email) {
    return res.send({ isUser: false });
  }

  const query = { email: email };
  const user = await usersCollection.findOne(query);
  const result = { isUser: user?.role === "user" };
  res.send(result);
};
module.exports = { getAllUsers, postUser, isUser, getSingleUser };
