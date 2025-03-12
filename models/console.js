const mongoose = require('mongoose');

const consoleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    purchaseDate: {
      type: String,
      required: true,
    },
    games: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    },
  },
  { timestamps: true }
);

const Console = mongoose.model('Console', consoleSchema);

module.exports = Console;
