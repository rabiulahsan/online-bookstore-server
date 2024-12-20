const express = require("express");
const {
  getAllUsers,
  postUser,
  getSingleUser,
  isUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const verifyJWT = require("../utils/verifyJWT");
const verifyUser = require("../utils/verifyUser");
const router = express.Router();

router.get("/getallusers", getAllUsers);
router.post("/postuser", postUser);
router.get("/role", verifyJWT, isUser);
router.get("/getsingleuser/:userId", getSingleUser);
router.put("/updateuser/:userId", verifyJWT, verifyUser, updateUser); //todo verify by admin
router.delete("/deleteuser/:userId", verifyJWT, deleteUser); //todo verify by admin

module.exports = router;
