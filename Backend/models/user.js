const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../server');  // Reference to the database instance
const router = express.Router();

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
  stmt.run(email, hashedPassword, (err) => {
    if (err) {
      res.status(400).send('Error registering user');
    } else {
      res.status(201).send('User registered successfully');
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (!row || !bcrypt.compareSync(password, row.password)) {
      res.status(403).send('Invalid credentials');
    } else {
      const token = jwt.sign({ id: row.id }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    }
  });
});

module.exports = router;
