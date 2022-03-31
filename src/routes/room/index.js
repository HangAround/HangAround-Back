const express = require('express');
const router = express.Router();

const new_room = require('./new_room.js');
const join_room = require('./join_room.js');
const room = require('./room.js');
const gameRoutes = require('./game/index.js');

router.use('/new_room', new_room);
router.use('/join_room', join_room);
router.use('', gameRoutes);
router.use('', room);


module.exports = router;