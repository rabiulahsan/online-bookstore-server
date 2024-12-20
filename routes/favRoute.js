const express = require("express");
const verifyJWT = require("../utils/verifyJWT");
const { getAllFavs } = require("../controllers/favController");

const router = express.Router();

router.get("/getall/:userId", verifyJWT, getAllFavs);

module.exports = router;
