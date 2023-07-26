const express = require("express");
const {
  getUserById,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.get("/getUserById/:id", getUserById);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
