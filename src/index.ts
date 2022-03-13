import "reflect-metadata";
import {createConnection, Connection} from "typeorm";

const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');
const app = express();

dotenv.config();
app.use(express.json());
app.use('/', routes);

createConnection().then(async connection => {

    console.log("DB CONNECTION!");

    app.listen(3000, () => {
      console.log("Server Starting... 3000");
      
    });

}).catch((err: Error) => console.log("Entity connection error : ", err));