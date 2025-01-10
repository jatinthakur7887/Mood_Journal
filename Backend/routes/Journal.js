const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const journalEntries = []; // In-memory journal storage

// Create Entry
router.post("/", authMiddleware, (req, res) => {
  const { title, content, mood } = req.body;
  const { email } = req.user;

  const newEntry = {
    id: journalEntries.length + 1,
    title,
    content,
    mood,
    date: new Date().toISOString(),
    user: email,
  };

  journalEntries.push(newEntry);
  res.status(201).json(newEntry);
});

// Get User Entries
router.get("/", authMiddleware, (req, res) => {
  const { email } = req.user;
  const userEntries = journalEntries.filter((entry) => entry.user === email);
  res.json(userEntries);
});

// Update Entry
router.put("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, content, mood } = req.body;
  const { email } = req.user;

  const entry = journalEntries.find((entry) => entry.id == id && entry.user === email);
  if (!entry) return res.status(404).json({ message: "Entry not found." });

  entry.title = title;
  entry.content = content;
  entry.mood = mood;
  res.json(entry);
});

// Delete Entry
router.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const entryIndex = journalEntries.findIndex((entry) => entry.id == id && entry.user === email);
  if (entryIndex === -1) return res.status(404).json({ message: "Entry not found." });

  journalEntries.splice(entryIndex, 1);
  res.json({ message: "Entry deleted." });
});

module.exports = router;
