const { db } = require("../utils/dbconnection");

const { ObjectId } = require("mongodb");
const booksCollection = db.collection("books");

// Ensure index creation for category
booksCollection.createIndex({ category: 1 }); // Create an index on the "category" field

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
        data: result,
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

//get a single book

const getSingleBook = async (req, res) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    return res.status(400).send({ message: "Book ID is required" });
  }

  const query = { _id: new ObjectId(String(bookId)) }; // Simplified query object creation
  try {
    const book = await booksCollection.findOne(query); // Find book by ID in the collection using the query object
    if (book) {
      res.status(200).send(book); // Send book data if found
    } else {
      res.status(404).send({ message: "Book not found" }); // Handle if book is not found
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
    console.log(bookId);

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

// Filter books by category (supports multiple categories)
const getBooksByCategory = async (req, res) => {
  const { categories } = req.query; // Example: ?categories=Adventure,Fantasy

  try {
    // Parse categories from query string
    const categoryArray = categories ? categories.split(",") : [];

    // Build query based on provided categories
    const query = categoryArray.length
      ? { category: { $in: categoryArray } }
      : {};

    // Fetch books matching the query
    const books = await booksCollection.find(query).toArray();

    //test the indexing on query
    // const explainResult = await booksCollection
    //   .find(query)
    //   .explain("executionStats");
    // console.log(JSON.stringify(explainResult, null, 2));

    res.json({ message: "Books fetched successfully", data: books });
  } catch (error) {
    console.log("Error fetching books by category:", error);
    res.status(500).json({ message: "Error fetching books", error });
  }
};

//get book of specific author
const getAuthorBooks = async (req, res) => {
  const authorId = req.params.authorId;
  console.log(authorId);

  try {
    // Build the query to find books by the author's ID
    const query = { authorId: authorId };
    console.log(query);
    // Fetch the books from the collection
    const result = await booksCollection.find(query).toArray();
    console.log(result);

    // Check if any books are found
    if (!result) {
      return res
        .status(404)
        .send({ message: "No Books Found for this author." });
    }

    // Send the result if books are found
    res.status(200).send({ message: "Books found.", data: result });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllBooks,
  postBook,
  updateBook,
  deleteBook,
  getSingleBook,
  getBooksByCategory,
  getAuthorBooks,
};
