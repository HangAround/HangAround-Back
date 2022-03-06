const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');

const {errResponse} = require("../config/response");
const authRouter = require('./routes/auth');
//const passportConfig = require('./passport');

dotenv.config();
const app = express();
//passportConfig(passport);


app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
console.log("왜 안돼");

app.use('/auth', authRouter);


//404 처리 미들웨어 (라우터에 등록되지 않은 주소로 요청이 들어올 때)
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 핸들러
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send(errResponse({"isSuccess": false, "code": (err.status||500), "message": err.message}));
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
