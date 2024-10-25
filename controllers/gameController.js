const Game = require('../models/Game');

// Start a new game
exports.startGame = async (req, res) => {
  try {
    const newGame = new Game({ multiplier: 1.0, status: 'active' });
    await newGame.save();
    res.status(201).json({ message: 'Game started!', gameId: newGame._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Place a bet
exports.placeBet = async (req, res) => {
  const { gameId, betAmount } = req.body;
  const userId = req.user.id;

  try {
    const game = await Game.findById(gameId);
    if (!game || game.status !== 'active') {
      return res.status(400).json({ message: 'Game not active or does not exist.' });
    }

    game.players.push({ userId, betAmount });
    await game.save();
    res.json({ message: 'Bet placed successfully!', game });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Cash out
exports.cashOut = async (req, res) => {
  const { gameId } = req.body;
  const userId = req.user.id;

  try {
    const game = await Game.findById(gameId);
    if (!game || game.status !== 'active') {
      return res.status(400).json({ message: 'Game not active or does not exist.' });
    }

    const player = game.players.find(player => player.userId.toString() === userId);
    if (!player) {
      return res.status(400).json({ message: 'You have not placed a bet on this game.' });
    }

    const winnings = player.betAmount * game.multiplier;
    game.status = 'completed';
    await game.save();

    res.json({ message: 'Cashed out successfully!', winnings });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
