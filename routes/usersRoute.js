const express = require("express");
const {
  getAllUsers,
  postUser,
  getSingleUser,
  isUser,
} = require("../controllers/usersController");
const verifyJWT = require("../utils/verifyJWT");
const router = express.Router();

router.get("/getallusers", getAllUsers);
router.post("/postuser", postUser);
router.get("/role", verifyJWT, isUser);
router.get("/getsingleuser/:id", getSingleUser);
module.exports = router;
