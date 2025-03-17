const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Game = require('../models/game.js');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const game = await Game.find({ user: req.user._id });
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    req.body.user = req.user._id;
    const game = await Game.create(req.body);
    game._doc.user = req.user;
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete('/:gameId', verifyToken, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    if (!game.user.equals(req.user._id)) {
      return res.status(403).send('Cant delete games from another user');
    }
    const deletedGame = await Game.findByIdAndDelete(req.params.gameId);
    res.status(200).json(deletedGame);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put('/:gameId', verifyToken, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    if (!game.user.equals(req.user._id)) {
      return res.status(403).send('Cant Update!');
    }

    const updatedGame = await Game.findByIdAndUpdate(
      req.params.gameId,
      req.body,
      { new: true }
    );

    updatedGame._doc.user = req.user;
    res.status(200).json(updatedGame);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:gameId', verifyToken, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId).populate(['title']);
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
