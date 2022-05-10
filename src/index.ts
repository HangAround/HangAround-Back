import "reflect-metadata";
import {createConnection, Connection} from "typeorm";

const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');

const session = require('express-session');
const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const indexRoutes = require('./routes/index');
const {errResponse} = require("../config/response");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();


createConnection().then(async (connection: Connection) => {

    console.log("DB CONNECTION!");

}).catch((err: Error) => console.log("Entity connection error : ", err));


const app = express();
passportConfig(); // 패스포트 설정

app.set('port', process.env.PORT || 3000);

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const morgan = require('morgan');
//winston 사용
const {logger, stream}= require('./winston');
const combined = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
// 기존 combined 포맷에서 timestamp 만 제거
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined;
// NOTE: morgan 출력 형태 server.env에서 NODE_ENV 설정 production : 배포 dev : 개발
console.log(morganFormat);

app.use(morgan(morganFormat, {stream}));

app.get("/", (req,res) => {
    logger.info("info_test");
    logger.warn("warn_test");
    logger.error("error_test");
    return res.json({hello: "world"});
})

//여기 까지

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize()); //요청 객체에 passport 설정을 심음
app.use(passport.session());   //req.session 객체에 passport 정보를 추가 저장
app.use(cors());

const favicon = require('serve-favicon'); //favicon 설정
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use('/', indexRoutes);

//404 처리 미들웨어 (라우터에 등록되지 않은 주소로 요청이 들어올 때)
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    res.status(404);
    res.send(errResponse({"isSuccess": false, "code": 404, "message": error.message}));
});

// 에러 핸들러
app.use((err, req, res, next) => {
    res.locals.message = process.env.NODE_ENV !== 'production' ? err.message : "재접속 해주세요.";
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(500);
    res.send(errResponse({"isSuccess": false, "code": err.code, "message": res.locals.message}));
});

module.exports = app;
