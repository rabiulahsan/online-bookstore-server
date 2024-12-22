const express = require("express");
const verifyUser = require("../utils/verifyUser");
const verifyJWT = require("../utils/verifyJWT");
const {
  getAllCarts,
  addItemToCart,
  removeitemFromCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/getall/:userId", verifyJWT, verifyUser, getAllCarts);
router.post("/add/:userId", verifyJWT, verifyUser, addItemToCart);
router.delete("/remove/:userId/:bookId", verifyJWT, removeitemFromCart);

module.exports = router;
