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

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userSchema.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "This user does not exist." });

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare)
      return res.status(500).json({ message: "Passwords don't match" });

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
};
