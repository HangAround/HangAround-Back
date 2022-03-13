const express = require('express');
const router = express.Router();

const auth = require('./auth.js');
const join_room = require('./join_room.js')

router.use('/auth', auth);
router.use('/join_room', join_room);

module.exports = router;