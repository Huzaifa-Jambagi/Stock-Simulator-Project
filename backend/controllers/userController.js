const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const handleSignup = async (req, res) => {
  let data = req.body;

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(data.password, salt);

    let user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword
    })
    console.log("user registered succesfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.json({ error: "error saving user into db" })
  }

}

const handleLogin = async (req, res) => {
  let data = req.body;

  const existingUser = await User.findOne({ email: data.email });
  if (!existingUser) {
    return res.status(400).json({ error: "Email does not exists" });
  }
  const isMatch = await bcrypt.compare(data.password, existingUser.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = jwt.sign(
    { id: existingUser._id },
    process.env.JWT_SECRET,
    { expiresIn: '30000s' }
  );
  res.json({ token });

  //when deploying
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "Strict",
  //   maxAge: 3600000, // 1 hour
  // });
  // res.json({ message: "Logged in successfully" });

}

const getUserDetails = async (req, res) => {
  try {
    // Use req.userId (set by the authorize middleware) to find the user
    const user = await User.findById(req.userId);  // req.userId is the ID set by the authorize middleware

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user details (name and balance)
    res.json({
      name: user.name,
      balance: user.balance,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { handleSignup, handleLogin, getUserDetails };