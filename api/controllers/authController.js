const userSchema = require("../models/userModel");

const userRegister = async (req, res) => {
  try {
    const { username, email, password, country } = req.body;
    const newUser = await userSchema.create({
      username,
      email,
      password,
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

module.exports = {
  userRegister,
};
