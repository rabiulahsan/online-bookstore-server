const express = require("express");
const {
  getAllBooks,
  postBook,
  updateBook,
  deleteBook,
  getSingleBook,
  getBooksByCategory,
} = require("../controllers/bookController");
const verifyJWT = require("../utils/verifyJWT");
const verifyAuthor = require("../utils/verifyAuthor");
const router = express.Router();

router.get("/getallbooks", getAllBooks);
router.get("/category", getBooksByCategory);
router.get("/getsinglebook/:bookId", getSingleBook);
router.post("/postbook", verifyJWT, verifyAuthor, postBook);
router.put("/updatebook/:bookId", verifyJWT, verifyAuthor, updateBook);
router.delete("/deletebook/:bookId", verifyJWT, verifyAuthor, deleteBook); //todo verify by admin and author

module.exports = router;
