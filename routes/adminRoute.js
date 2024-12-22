const express = require("express");
const { getAllAdmins } = require("../controllers/adminController");

const router = express.Router();

router.get("/getall", getAllAdmins);

module.exports = router;
