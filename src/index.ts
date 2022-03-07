import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import {User} from "./entities/User";

const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');
const {errResponse} = require("../config/response");
const authRouter = require('./routes/auth');

dotenv.config();

createConnection().then( async (connection: Connection) => {

    console.log("DB CONNECTION!");
    /*const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);
    */

}).catch((err: Error) => console.log("Entity connection error : ", err));
//catch(error => console.log(error));


/*
import { createConnection, Connection } from "typeorm";

//connect to entity
createConnection()
  .then(async (connection: Connection) =>
    console.log("Entity connected : ", connection.isConnected)
  )
  .catch((err: Error) => console.log("Entity connection error : ", err));
*/ //https://133hyun.tistory.com/61에 의거한 코드

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', routes);
app.use('/auth', authRouter);

//404 처리 미들웨어 (라우터에 등록되지 않은 주소로 요청이 들어올 때)
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    next(error);
});

// 에러 핸들러
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send(errResponse({"isSuccess": false, "code": (err.status || 500), "message": err.message}));
});

module.exports = app;
