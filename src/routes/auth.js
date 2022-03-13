const express = require('express');
const passport = require('passport');
const {User} = require("../entities/User");
const {getRepository} = require("typeorm");

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/login',
}), (req, res) => {
    res.redirect('/main');
});

module.exports = router;