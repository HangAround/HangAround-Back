const express = require('express');
const passport = require('passport');
const {User} = require("../entities/User");
const {getRepository} = require("typeorm");
const baseResponse = require("../../config/baseResponseStatus");
const {response} = require("../../config/response");

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/login',
}), (req, res) => {
    res.redirect('/main');
});

router.get('/without-login', async (req, res, next) => {
    try {
        const userRepository = getRepository(User);
        const newUser = await userRepository.create({
            channel: "local"
        });
        await userRepository.save(newUser);
        res.send(response(baseResponse.SUCCESS));
    } catch (error) {
        console.error(error);
        next(baseResponse.DB_ERROR)
    }
})

module.exports = router;