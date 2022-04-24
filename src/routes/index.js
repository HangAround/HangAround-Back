const express = require('express');
const router = express.Router();

router.use(express.json());

const auth = require('./auth.js');
const roomRoutes = require('./room/index.js');
const gameRoutes = require('./game/index.js');
const {isNotLoggedIn, isLoggedIn} = require("./middleware");

router.use('/auth', auth);
router.use('/room', roomRoutes);
router.use('/room', gameRoutes);

router.get('/login', (req, res) => {
    res.send("로그인 선택 화면");
});

router.get('/',  (req, res) => {
    res.send("로그인 후 홈화면");
});

module.exports = router;