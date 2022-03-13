import "reflect-metadata";
import {createConnection} from "typeorm";

const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/', routes);

createConnection().then(async connection => {

    console.log("DB CONNECTION!");

    app.listen(3000, () => {
      console.log("Server Starting... 3000");
      
    });

}).catch((err: Error) => console.log("Entity connection error : ", err));

//module.exports = app;