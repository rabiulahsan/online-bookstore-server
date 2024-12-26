const express = require("express");
const verifyUser = require("../utils/verifyUser");
const verifyJWT = require("../utils/verifyJWT");
const {
  getAllCarts,
  addItemToCart,
  removeitemFromCart,
  deleteAll,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/getall/:userId", verifyJWT, verifyUser, getAllCarts);
router.post("/add/:userId", verifyJWT, verifyUser, addItemToCart);
router.delete(
  "/remove/:userId/:bookId",
  verifyJWT,
  verifyUser,
  removeitemFromCart
);
router.delete("/deletecart/:userId", verifyJWT, verifyUser, deleteAll);

module.exports = router;
