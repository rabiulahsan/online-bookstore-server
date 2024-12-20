const express = require("express");
const { getAllUsers, postUser } = require("../controllers/usersController");
const router = express.Router();

router.get("/getallusers", getAllUsers);
router.post("/postuser", postUser);

module.exports = router;
