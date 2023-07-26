const express = require("express");
const {
  getUserById,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");
const verifyToken = require("../middleware/jwt");
const router = express.Router();

router.get("/getUserById/:id", getUserById);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:id", verifyToken, deleteUser);

module.exports = router;
