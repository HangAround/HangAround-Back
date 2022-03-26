const express = require('express');
const passport = require('passport');
const {User} = require("../entities/User");
const {getRepository} = require("typeorm");
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");
const jwt = require("jsonwebtoken");
const {httpOnly} = require("express-session/session/cookie");
const {USER_LOCALPASSPORT_ERROR} = require("../../config/baseResponseStatus");

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/login',
}), (req, res) => {
    const token = jwt.sign({
        id: req.user.userId,
    }, process.env.JWT_SECRET, {
        expiresIn: '12h',
        issuer: 'hangaround',
    });
    res.cookie("loginToken", token, {httpOnly: true});
    res.redirect('/main');
});

router.get('/without-login', async (req, res, next) => {
    passport.authenticate('local', async (authError, user) => {
        if (authError) {
            console.error(authError);
            return errResponse(USER_LOCALPASSPORT_ERROR);
        }

        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return errResponse(USER_LOCALPASSPORT_ERROR);
            }

            const token = jwt.sign({
                id: req.user.userId,
            }, process.env.JWT_SECRET, {
                expiresIn: '12h',
                issuer: 'hangaround',
            });
            res.cookie("loginToken", token, {httpOnly: true});
            res.redirect('/main');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

module.exports = router;