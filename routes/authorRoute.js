const express = require("express");
const {
  getAllAuthors,
  postAuthor,
  getSingleAuthor,
  isAuthor,
  updateAuthor,
} = require("../controllers/authorController");
const verifyJWT = require("../utils/verifyJWT");
const verifyAuthor = require("../utils/verifyAuthor");

const router = express.Router();

router.get("/getallauthors", getAllAuthors);
router.post("/postauthor", postAuthor);
router.put("/updateauthor/:authorId", verifyJWT, verifyAuthor, updateAuthor); //todo add verifyadmin aslo
router.get("/role", verifyJWT, isAuthor);
router.get("/getsingleauthor/:id", getSingleAuthor);

module.exports = router;
