const express = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", userRegister);

module.exports = router;
