const express = require('express');
const router = express.Router();
const {getConnection} = require("typeorm");
const {Room} = require("../entities/Room");
const baseResponseStatus = require("../../config/baseResponseStatus");

var room_code = Math.random().toString(36).slice(2);

router.post('/', async (req,res,next)=> {
  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Room)
      .values({ 
        roomName: req.body.roomName,
        maxPlayer: req.body.maxPlayer,
        roomCode: room_code,
        ownerId: req.body.ownerId,
        gameId: 1 //일단 new_room에서는 무조건 default_game으로 주기
      })
      .execute()
      res.send(baseResponseStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        next(baseResponseStatus.NEW_ROOM_ERROR);
      }
});

router.use(function (req, res, next){
  var json_room_code = { 'roomCode': room_code };
  res.send(json_room_code);
});

module.exports = router;