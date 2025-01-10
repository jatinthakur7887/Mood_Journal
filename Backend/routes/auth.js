const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = []; // In-memory user storage
const JWT_SECRET = "supersecretkey"; // Replace with a secure key in production

// Register Route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "All fields are required." });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully." });
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found." });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials." });

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
