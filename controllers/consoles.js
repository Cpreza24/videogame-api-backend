const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Console = require('../models/console.js');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const console = await Console.find({});
    res.status(200).json(console);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    req.body.user = req.user._id;
    const console = await Console.create(req.body);
    console._doc.user = req.user;
    res.status(201).json(console);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete('/:consoleId', verifyToken, async (req, res) => {
  try {
    const console = await Console.findById(req.params.consoleId);

    if (!console.user.equals(req.user._id)) {
      return res.status(403).send('Cant delete consoles from another user');
    }
    const deletedConsole = await Console.findByIdAndDelete(
      req.params.consoleId
    );
    res.status(200).json(deletedConsole);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put('/:consoleId', verifyToken, async (req, res) => {
  try {
    const console = await Console.findById(req.params.consoleId);

    if (!console.user.equals(req.user._id)) {
      return res.status(403).send('Cant Update!');
    }

    const updatedConsole = await Console.findByIdAndUpdate(
      req.params.consoleId,
      req.body,
      { new: true }
    );

    updatedConsole._doc.user = req.user;
    res.status(200).json(updatedConsole);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:consoleId', verifyToken, async (req, res) => {
  try {
    const console = await Console.findById(req.params.consoleId).populate([
      'name',
    ]);
    res.status(200).json(console);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
