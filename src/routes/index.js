const express = require('express');
const router = express.Router();

router.use(express.json());

const auth = require('./auth.js');
const new_room = require('./new_room.js');
const join_room = require('./join_room.js')

router.use('/auth', auth);
router.use('/new_room', new_room);
router.use('/join_room', join_room);


router.get('/main', async (req, res) => {
    res.send("메인 화면");
});

router.get('/login', async (req, res) => {
    res.send("로그인 화면");
});

module.exports = router;