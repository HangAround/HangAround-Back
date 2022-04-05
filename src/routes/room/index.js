const express = require('express');
const router = express.Router();

const new_room = require('./new_room.js');
const join_room = require('./join_room.js');
const room = require('./room.js');

router.use('/new-room', new_room);
router.use('/join-room', join_room);
router.use('', room);


module.exports = router;