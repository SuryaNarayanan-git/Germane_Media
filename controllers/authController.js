const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET =
  "5054ff362adf6f48bfb832e37d0bbffa8d2e20f08879d266a32f96f11fa99758cc179ec2ac84b4d23835f1ef970b8b67bd4047a58e2ccc38bd80dafc434dc6ce5b5e56817022c65cf54fc90220411524bf89b6cb4a94f8f0b286b9efc0b9107b883663a1ab5cf255c540784752bcbb89749611935ba6892fdfcaebf0b8c0c3abb52d63ed0849dccfce4ec11fbd07a2c9a13be98bed9f4e8bb35a7dff3781bbac61971961121a04a8d01f5a4157cedcc0a2d4fb495b1b850b593331c555f8c6d8a37dae0f5565fdf51268bb44f47fe2159a0cce8077bea5bcc64e3d6a1490b9d313bafd4ca9d80a42552540a6119ede08d546050fcc44799b4c910eb6490b5d79"; // Replace with a secure key in production

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(400).json({ error: "Username already exists." });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password." });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ message: "Login successful.", token });
};
