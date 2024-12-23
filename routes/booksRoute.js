const express = require("express");
const {
  getAllBooks,
  postBook,
  updateBook,
  deleteBook,
  getSingleBook,
  getBooksByCategory,
  getAuthorBooks,
} = require("../controllers/bookController");
const verifyJWT = require("../utils/verifyJWT");
const verifyAuthor = require("../utils/verifyAuthor");
const router = express.Router();

router.get("/getallbooks", getAllBooks);
router.get("/category", getBooksByCategory);
router.get("/getsinglebook/:bookId", getSingleBook);
router.get("/getbook/:authorId", getAuthorBooks);
router.post("/postbook", verifyJWT, verifyAuthor, postBook);
router.put("/updatebook/:bookId", verifyJWT, verifyAuthor, updateBook);
router.delete("/deletebook/:bookId", verifyJWT, deleteBook); //todo verify by admin and author

module.exports = router;
