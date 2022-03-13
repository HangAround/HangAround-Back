const express = require('express');
//const passport = require('passport');
const {User} = require("../entities/User");
const { getRepository } = require("typeorm");

const router = express.Router();

router.get('/ex',async (req, res) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(1);
    res.send(user);
});

//router.get('/kakao', passport.authenticate('kakao'));

module.exports = router;