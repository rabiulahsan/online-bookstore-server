const express = require("express");
const verifyJWT = require("../utils/verifyJWT");
const {
  getAllFavs,
  addFav,
  removeFav,
} = require("../controllers/favController");

const router = express.Router();

router.get("/getall/:userId", verifyJWT, getAllFavs);
router.post("/add/:userId", verifyJWT, addFav);
router.delete("/remove/:userId/:bookId", verifyJWT, removeFav);

module.exports = router;
