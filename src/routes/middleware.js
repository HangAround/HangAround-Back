const jwt = require('jsonwebtoken');
const {errResponse} = require("../../config/response");
const baseResponse = require("../../config/baseResponseStatus");

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send(baseResponse.AUTH_LOGIN_ERROR);
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers["auth"];
        if (!token) {
            return res.errResponse(baseResponse.TOKEN_EMPTY);
        }
        req.decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (req.decoded) {
            res.locals.userId = req.decoded.id
            return next();
        }else{
            return errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE)
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 유효기간 초과
            return errResponse(baseResponse.TOKEN_EXPIRED_ERROR);
        }
        return errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE);
    }
};
