const express = require("express");
const { getAllBooks, postBook } = require("../controllers/bookController");
const verifyJWT = require("../utils/verifyJWT");
const verifyAuthor = require("../utils/verifyAuthor");
const router = express.Router();

router.get("/getallbooks", getAllBooks);
router.post("/postbook", verifyJWT, verifyAuthor, postBook);

module.exports = router;
