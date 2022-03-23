const express = require('express');
const router = express.Router();


router.use(express.json());

const auth = require('./auth.js');
const roomRoutes = require('./room/index.js');
//const room = require(roomRouter);
//const new_room = require('./room/new_room.js');
//const join_room = require('./join_room.js')

router.use('/auth', auth);
router.use('/room', roomRoutes);
//router.use('/new_room', new_room);
//router.use('/join_room', join_room);


router.get('/main', async (req, res) => {
    res.send("메인 화면");
});

router.get('/login', async (req, res) => {
    res.send("로그인 화면");
});

module.exports = router;