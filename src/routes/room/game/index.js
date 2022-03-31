const express = require('express');
const router = express.Router();

const liarGame = require('./liarGame.js');

router.use('/:roomCode/liar_game', liarGame);

module.exports = router;