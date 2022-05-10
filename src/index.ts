import "reflect-metadata";
import {createConnection, Connection} from "typeorm";

const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const logger = require('morgan');
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

// 1. ws 모듈 취득
const WebSocketS = require("ws");

// 2. WebSocket 서버 생성/구동 
const webSocketServer = new WebSocketS.Server( 
    {   server: app, // WebSocket서버에 연결할 HTTP서버를 지정한다. 
        //port: 3000 // WebSocket연결에 사용할 port를 지정한다(생략시, http서버와 동일한 port 공유 사용) 
    } 
);

// connection(클라이언트 연결) 이벤트 처리
webSocketServer.on('connection', (ws, request)=>{
    // 1) 연결 클라이언트 IP 취득 
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    console.log(`새로운 클라이언트[${ip}] 접속`);
    
    // 2) 클라이언트에게 메시지 전송
    if(ws.readyState === ws.OPEN){ // 연결 여부 체크 
        ws.send(`클라이언트[${ip}] 접속을 환영합니다 from 서버`); // 데이터 전송 
    } 
    
    // 3) 클라이언트로부터 메시지 수신 이벤트 처리 
    ws.on('message', (msg)=>{ 
        console.log(`클라이언트[${ip}]에게 수신한 메시지 : ${msg}`);
        ws.send('메시지 잘 받았습니다! from 서버') });
        
    // 4) 에러 처러 
    ws.on('error', (error)=>{
        console.log(`클라이언트[${ip}] 연결 에러발생 : ${error}`); 
    }) 
    
    // 5) 연결 종료 이벤트 처리 
    ws.on('close', ()=>{ 
        console.log(`클라이언트[${ip}] 웹소켓 연결 종료`); 
    }) 
});




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
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
