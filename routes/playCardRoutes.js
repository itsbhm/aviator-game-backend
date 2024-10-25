const express = require('express');
const router = express.Router();
const PlayCard = require('../models/PlayCard');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');


// Purchase Play Card
router.post('/purchase', authMiddleware, async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id; // Get user ID from the token payload

  // Validate amount
  if (amount < 300 || amount > 9999) {
    return res.status(400).json({ message: 'Amount must be between 300 and 9999 INR.' });
  }

  try {
    const playCard = new PlayCard({ userId, amount });
    await playCard.save();
    res.status(201).json({ message: 'Play card purchased successfully!', playCard });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Redeem Play Card
router.post('/redeem', authMiddleware, async (req, res) => {
  const { playCardId } = req.body;
  const userId = req.user.id; // Get user ID from the token payload

  try {
    const playCard = await PlayCard.findOne({ _id: playCardId, userId });
    if (!playCard) {
      return res.status(404).json({ message: 'Play card not found.' });
    }

    // Here you would add the logic to update the user's balance based on the play card amount

    res.json({ message: 'Play card redeemed successfully!', amount: playCard.amount });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});


module.exports = router;
