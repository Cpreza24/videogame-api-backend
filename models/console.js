const mongoose = require('mongoose');

const consoleSchema = new mongoose.Schema(
  {
    name: {
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Console = mongoose.model('Console', consoleSchema);

module.exports = Console;
