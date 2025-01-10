const express = require("express");

const router = express.Router();

// Hardcoded Quotes
const quotes = [
  "Keep going, you’re doing great!",
  "Every day is a second chance.",
  "Believe in yourself and all that you are.",
  "You are capable of amazing things.",
];

// Get Random Quote
router.get("/", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

module.exports = router;
