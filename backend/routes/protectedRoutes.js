const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Example route that requires authentication
router.get('/protected', authMiddleware, (req, res) => {
  // Access the decoded user token from req.user
  const { username, role } = req.user;
  res.json({ message: `Welcome ${username}, your role is ${role}` });
});

module.exports = router;
