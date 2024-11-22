const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "5054ff362adf6f48bfb832e37d0bbffa8d2e20f08879d266a32f96f11fa99758cc179ec2ac84b4d23835f1ef970b8b67bd4047a58e2ccc38bd80dafc434dc6ce5b5e56817022c65cf54fc90220411524bf89b6cb4a94f8f0b286b9efc0b9107b883663a1ab5cf255c540784752bcbb89749611935ba6892fdfcaebf0b8c0c3abb52d63ed0849dccfce4ec11fbd07a2c9a13be98bed9f4e8bb35a7dff3781bbac61971961121a04a8d01f5a4157cedcc0a2d4fb495b1b850b593331c555f8c6d8a37dae0f5565fdf51268bb44f47fe2159a0cce8077bea5bcc64e3d6a1490b9d313bafd4ca9d80a42552540a6119ede08d546050fcc44799b4c910eb6490b5d79";

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};
