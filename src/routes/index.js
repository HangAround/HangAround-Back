const express = require('express');
const router = express.Router();

const auth = require('./auth.js');
const new_room = require('./new_room.js')

router.use('/auth', auth);
router.use('/new_room', new_room);


router.get('/main', async (req, res) => {
    res.send("메인 화면");
});

router.get('/login', async (req, res) => {
    res.send("로그인 화면");
});

module.exports = router;