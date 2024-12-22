const express = require("express");
const { getAllAdmins, isAdmin } = require("../controllers/adminController");
const verifyJWT = require("../utils/verifyJWT");

const router = express.Router();

router.get("/getall", getAllAdmins);
router.get("/role", verifyJWT, isAdmin);

module.exports = router;
