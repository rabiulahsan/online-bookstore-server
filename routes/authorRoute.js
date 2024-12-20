const express = require("express");
const { getAllAuthors } = require("../controllers/authorController");

const router = express.Router();
app.get("/getallauthors", getAllAuthors);

module.exports = router;
