const express = require("express");
const {
  getAllAuthors,
  postAuthor,
  getSingleAuthor,
  isAuthor,
} = require("../controllers/authorController");
const verifyJWT = require("../utils/verifyJWT");

const router = express.Router();

router.get("/getallauthors", getAllAuthors);
router.post("/postauthor", postAuthor);
router.get("/role", verifyJWT, isAuthor);
router.get("/getsingleauthor/:id", getSingleAuthor);

module.exports = router;
