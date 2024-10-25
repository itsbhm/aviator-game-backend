const mongoose = require('mongoose');

const playCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, expires: '365d' } // Optional: expire after 1 year
});

const PlayCard = mongoose.model('PlayCard', playCardSchema);
module.exports = PlayCard;
