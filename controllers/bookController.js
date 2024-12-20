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

  // Add the created_at field with the current ISO timestamp
  newBook.created_at = new Date().toISOString();
  console.log(newBook);
  try {
    // Insert the new book
    const result = await booksCollection.insertOne(newBook);

    if (result.insertedId) {
      res.status(201).send({
        message: "New book created successfully",
        bookId: result.insertedId,
        created_at: newBook.created_at, // Optionally return the timestamp
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

// Update a book
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const updatedData = req.body;

    // Add `updated_at` timestamp to the update data
    updatedData.updated_at = new Date();
    console.log(updatedData);

    // Update the book in the collection
    const result = await booksCollection.updateOne(
      { _id: new ObjectId(String(bookId)) }, // Filter by the book's ID
      { $set: updatedData }, // Set the updated fields
      { upsert: true }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating book", error });
  }
};

// Delete a book

const deleteBook = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const query = { _id: new ObjectId(String(bookId)) };
    const result = await booksCollection.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      return res.json({ message: "Book deleted successfully", result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting book", error });
  }
};

module.exports = { getAllBooks, postBook, updateBook, deleteBook };
