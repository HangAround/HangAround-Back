const express = require('express');
const router = express.Router();

const liarGame = require('./liarGame.js');
const consonantGame = require('./consonantGame.js');

router.use('/:roomCode/liar_game', liarGame);
router.use('/:roomCode/consonant_game',consonantGame);

module.exports = router;