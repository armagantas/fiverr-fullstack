const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  try {
    const { username, email, password, country } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await userSchema.create({
      username,
      email,
      password: passwordHash,
      country,
    });

    res.status(201).json({
      status: "OK",
      newUser,
      message: "User has been created.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {};

module.exports = {
  userRegister,
};
