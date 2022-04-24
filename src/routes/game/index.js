const express = require('express');
const router = express.Router();

const liarGame = require('./liarGame.js');
const consonantGame = require('./consonantGame.js');

router.use('', liarGame);
router.use('/:roomCode/consonantGame',consonantGame)

module.exports = router;