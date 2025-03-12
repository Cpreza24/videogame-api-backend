const mongoose = require('mongoose');

const videoGameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    console: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', videoGameSchema);

module.exports = Game;
