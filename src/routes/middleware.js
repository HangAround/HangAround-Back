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
            res.send(errResponse(baseResponse.TOKEN_EMPTY));
        }
        req.decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error({auth: false, message: err});
                throw err;
            }
            next();
        });
        if (req.decoded) {
            res.locals.userId = req.decoded.id;
            return next();
        }
        else
            throw req.decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 유효기간 초과
            res.send(errResponse(baseResponse.TOKEN_EXPIRED_ERROR));
        }
        res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
    }
};
