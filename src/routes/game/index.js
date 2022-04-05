const express = require('express');
const router = express.Router();

const liarGame = require('./liarGame.js');

router.use('', liarGame);

module.exports = router;