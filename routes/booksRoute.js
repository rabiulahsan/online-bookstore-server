const express = require("express");
const {
  getAllBooks,
  postBook,
  updateBook,
} = require("../controllers/bookController");
const verifyJWT = require("../utils/verifyJWT");
const verifyAuthor = require("../utils/verifyAuthor");
const router = express.Router();

router.get("/getallbooks", getAllBooks);
router.post("/postbook", verifyJWT, verifyAuthor, postBook);
router.put("/updatebook/:bookId", updateBook);

module.exports = router;
