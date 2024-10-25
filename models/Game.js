const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, betAmount: Number }],
  multiplier: { type: Number, required: true },
  status: { type: String, enum: ['active', 'finished'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
