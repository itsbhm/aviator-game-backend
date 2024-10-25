const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const gameController = require('../controllers/gameController');

router.post('/start', authMiddleware, gameController.startGame);
router.post('/bet', authMiddleware, gameController.placeBet);
router.post('/cashout', authMiddleware, gameController.cashOut);

module.exports = router;
