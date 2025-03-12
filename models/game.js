const mongoose = require('mongoose');

const videoGameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    console: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Console',
    },
    rating: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', videoGameSchema);

module.export = Game;
