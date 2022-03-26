const jwt = require('jsonwebtoken');
const {TOKEN_EMPTY, TOKEN_VERIFICATION_FAILURE, TOKEN_EXPIRED_ERROR} = require("../../config/baseResponseStatus");
const {errResponse} = require("../../config/response");
const {JsonWebTokenError} = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        if(!req.headers.authorization){
            return res.errResponse(TOKEN_EMPTY);
        }
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 유효기간 초과
            return errResponse(TOKEN_EXPIRED_ERROR);
        }
        return errResponse(TOKEN_VERIFICATION_FAILURE);
    }
};
