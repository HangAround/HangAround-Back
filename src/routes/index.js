const express = require('express');
const router = express.Router();

const auth = require('./auth.js');
const new_room = require('./new_room.js')

router.use('/auth', auth);
router.use('/new_room', new_room);

module.exports = router;