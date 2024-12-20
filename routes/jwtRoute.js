const express = require("express");
const { generateJwtToken } = require("../controllers/jwtController");

const router = express.Router();

router.post("/", generateJwtToken);

module.exports = router;
