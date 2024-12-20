const { db } = require("../utils/dbconnection");

const { ObjectId } = require("mongodb");
const booksCollection = db.collection("books");

// get all books
const getAllBooks = async (req, res) => {
  try {
    const result = await booksCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

//post a book
const postBook = async (req, res) => {
  const newBook = req.body;

  try {
    // Insert new doctor
    const result = await booksCollection.insertOne(newBook);

    if (result.insertedId) {
      res.status(201).send({
        message: "New book created successfully",
        bookId: result.insertedId,
      });
    } else {
      res.status(500).send({ message: "Failed to create book" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

module.exports = { getAllBooks, postBook };
