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

  if (req.decoded.email !== email) {
    return res.send({ isAuthor: false });
  }

  const query = { email: email };
  const author = await authorsCollection.findOne(query);
  // console.log(author);
  const result = { isAuthor: author?.role === "author" };
  res.send(result);
};

//api for updating a author
const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const updatedAuthor = req.body;

    // Add `updated_at` timestamp to the update data
    updatedAuthor.updated_at = new Date();
    // console.log(updatedAuthor);

    // Update the author in the collection
    const result = await authorsCollection.updateOne(
      { _id: new ObjectId(String(authorId)) }, // Filter by the authors's ID
      { $set: updatedAuthor }, // Set the updated fields
      { upsert: true }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json({ message: "Author updated successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating Author", error });
  }
};

//delete a author
const deleteAuthor = async (req, res) => {
  const authorId = req.params.authorId;

  try {
    const query = { _id: new ObjectId(String(authorId)) };
    const result = await authorsCollection.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Author not found" });
    } else {
      return res.json({ message: "Author deleted successfully", result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting author", error });
  }
};

module.exports = {
  getAllAuthors,
  postAuthor,
  getSingleAuthor,
  isAuthor,
  updateAuthor,
  deleteAuthor,
};
