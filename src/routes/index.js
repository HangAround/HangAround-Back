const express = require('express');
const router = express.Router();


router.use(express.json());

const auth = require('./auth.js');
const roomRoutes = require('./room/index.js');

router.use('/auth', auth);
router.use('/room', roomRoutes);


router.get('/main', async (req, res) => {
    res.send("메인 화면");
});

router.get('/login', async (req, res) => {
    res.send("로그인 화면");
});

module.exports = router;