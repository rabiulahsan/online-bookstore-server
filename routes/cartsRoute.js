const express = require("express");
const verifyUser = require("../utils/verifyUser");
const verifyJWT = require("../utils/verifyJWT");
const { getAllCarts } = require("../controllers/cartController");

const router = express.Router();

router.get("/getall/:userId", verifyJWT, verifyUser, getAllCarts);

module.exports = router;
