const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Console = require('../models/console.js');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const console = await Console.find({});
    res.status(200).json(console);
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
});

module.exports = router;
