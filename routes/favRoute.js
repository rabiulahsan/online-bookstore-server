const express = require("express");
const verifyUser = require("../utils/verifyUser");
const verifyJWT = require("../utils/verifyJWT");
const { getAllFavs } = require("../controllers/favController");

const router = express.Router();

router.get("/getall", verifyJWT, verifyUser, getAllFavs);

module.exports = router;
