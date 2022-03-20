const express = require('express');
const router = express.Router();
const {getConnection} = require("typeorm");
const {Room} = require("../entities/Room");
const baseResponse = require("../../config/baseResponseStatus");
const {response} = require("../../config/response");
const {errResponse} = require("../../config/response");

let room_code = Math.random().toString(36).slice(2);

router.get('/', function (req, res, next){
  let json_room_code = { 'roomCode': room_code };
  res.send(response(baseResponse.SUCCESS, json_room_code));
})

router.post('/', async (req,res,next)=> {
  let {roomName, maxPlayer, ownerId} = req.body;

  if(!roomName)
    return res.send(response(baseResponse.ROOM_NAME_EMPTY));

  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Room)
      .values({ 
        roomName: roomName,
        maxPlayer: maxPlayer,
        roomCode: room_code,
        ownerId: ownerId,
        gameId: 1 //일단 new_room에서는 무조건 default_game으로 주기
      })
      .execute()
      res.send(response(baseResponse.SUCCESS));
    } catch (error) {
      res.send(baseResponse.NEW_ROOM_ERROR);
      }
});

module.exports = router;