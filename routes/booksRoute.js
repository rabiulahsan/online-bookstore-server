const express = require("express");
const {
  getAllBooks,
  postBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const verifyJWT = require("../utils/verifyJWT");
const verifyAuthor = require("../utils/verifyAuthor");
const verifyUser = require("../utils/verifyUser");
const router = express.Router();

router.get("/getallbooks", getAllBooks);
router.post("/postbook", verifyJWT, verifyAuthor, postBook);
router.put("/updatebook/:bookId", verifyJWT, verifyAuthor, updateBook);
router.delete("/deletebook/:bookId", verifyJWT, verifyAuthor, deleteBook); //todo verify by admin and author

module.exports = router;
