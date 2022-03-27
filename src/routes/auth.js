const express = require('express');
const passport = require('passport');
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");
const jwt = require("jsonwebtoken");
const {httpOnly} = require("express-session/session/cookie");
const {isNotLoggedIn} = require("./middleware");

const router = express.Router();

//카카오 로그인
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao'), ( req, res) => {
    const token = jwt.sign({
        id: req.user.userId,
    }, process.env.JWT_SECRET, {
        expiresIn: '12h',
        issuer: 'hangaround',
    });
    //res.cookie("loginToken", token, {httpOnly: true});
    res.send(response(baseResponse.SUCCESS, {"userId": req.user.userId, "JWT": token}));
}
);

//로그인 없이 입장
router.get('/without-login', async (req, res, next) => {
    passport.authenticate('local', async (authError, user) => {
        if (authError) {
            console.error(authError);
            return errResponse(baseResponse.USER_LOCALPASSPORT_ERROR);
        }

        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return errResponse(baseResponse.USER_LOCALPASSPORT_ERROR);
            }

            const token = jwt.sign({
                id: req.user.userId,
            }, process.env.JWT_SECRET, {
                expiresIn: '12h',
                issuer: 'hangaround',
            });
            //res.cookie("loginToken", token, {httpOnly: true});
            res.send(response(baseResponse.SUCCESS, {"userId": user.userId, "JWT": token}));
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

//test를 위한 로그인(유저 새로 생성x, 원하는 userId의 JWT 토큰 값을 알 수 있음
router.get('/:userId', async (req, res, next) => {
    passport.authenticate('custom', async (authError, user) => {
        if (authError) {
            console.error(authError);
            return errResponse(baseResponse.USER_LOCALPASSPORT_ERROR);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return errResponse(baseResponse.USER_LOCALPASSPORT_ERROR);
            }
            const token = jwt.sign({
                id: req.user.userId,
            }, process.env.JWT_SECRET, {
                expiresIn: '12h',
                issuer: 'hangaround',
            });

            res.send(response(baseResponse.SUCCESS, {"userId": user.userId, "JWT": token}))
        });
    })(req, res, next);
})

module.exports = router;