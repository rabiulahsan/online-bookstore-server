const { db } = require("../utils/dbconnection");
const { ObjectId } = require("mongodb");

const authorsCollection = db.collection("authors");

// get all doctors
const getAllAuthors = async (req, res) => {
  try {
    const result = await authorsCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

//post a user after signup
const postAuthor = async (req, res) => {
  const newAuthor = req.body;
  const query = { email: newAuthor.email };

  try {
    // Check if the author already exists
    const exist = await authorsCollection.findOne(query);
    if (exist) {
      return res.status(409).send({ message: "Author already exists" });
    }
    // Insert new doctor
    const result = await authorsCollection.insertOne(newAuthor);

    if (result.insertedId) {
      res.status(201).send({
        message: "Author created successfully",
        authorId: result.insertedId,
      });
    } else {
      res.status(500).send({ message: "Failed to create author" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

const getSingleAuthor = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: "id  is required" });
  }
  const query = { _id: new ObjectId(String(id)) };
  try {
    const author = await authorsCollection.findOne(query); // Find author by email
    if (author) {
      res.status(200).send(author); // Send author data if found
    } else {
      res.status(404).send({ message: "Author not found" }); // Handle if author is not found
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

//get author role by eamil
const isAuthor = async (req, res) => {
  const email = req.query.email;

  // console.log(email);
  // console.log(req.decoded);

  if (req.decoded.email !== email) {
    return res.send({ isAuthor: false });
  }

  const query = { email: email };
  const author = await authorsCollection.findOne(query);
  // console.log(author);
  const result = { isAuthor: author?.role === "author" };
  res.send(result);
};

module.exports = { getAllAuthors, postAuthor, getSingleAuthor, isAuthor };
