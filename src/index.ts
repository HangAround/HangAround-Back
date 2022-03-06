import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

const express = require('express');
const app = express();
const routes = require('./routes');
app.use('/', routes);

createConnection().then(async connection => {

    console.log("DB CONNECTION!");

    
    
    app.listen(3000, () => {
      console.log("Server Starting... 3000");
      
    });

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
    

    console.log("Here you can setup and run express/koa/any other framework.");

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
