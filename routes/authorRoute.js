const express = require("express");
const {
  getAllAuthors,
  postAuthor,
  getSingleAuthor,
  isAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const verifyJWT = require("../utils/verifyJWT");
const verifyAuthor = require("../utils/verifyAuthor");

const router = express.Router();

router.get("/getallauthors", getAllAuthors);
router.post("/postauthor", postAuthor);
router.get("/role", verifyJWT, isAuthor);
router.get("/getsingleauthor/:id", getSingleAuthor);
router.put("/updateauthor/:authorId", verifyJWT, verifyAuthor, updateAuthor); //todo add verifyadmin aslo
router.delete("/deleteauthor/:authorId", verifyJWT, deleteAuthor); //todo add verifyadmin aslo

module.exports = router;
