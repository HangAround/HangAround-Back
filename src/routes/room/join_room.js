const express = require('express');
const router = express.Router();

const {User} = require("../../entities/User");
const {Room} = require("../../entities/Room");

const {getRepository, getConnection} = require("typeorm");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

router.get('/join_room', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ex', async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(5);
  res.send(user);
});

router.put('/', async (req,res)=> {
  try {
    let {userId, userName, roomCode} = req.body;

    let userRepository = getRepository(Room);
    let room = await userRepository.findOne({roomCode});
    if(room == undefined) {
      res.send(errResponse(baseResponse.ROOM_CODE_ERROR));
    } else if(room.playerCnt == room.maxPlayer) {
      res.send(errResponse(baseResponse.ROOM_CAPACITY_EXCESS_ERROR));
    } else if(room.gameId != 1) {
      res.send(errResponse(baseResponse.ROOM_STATUS_ERROR));
    } else if(!userName) {
      res.send(errResponse(baseResponse.USER_NAME_EMPTY));
    } else {
      await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        userName: userName,
        room: room
      })
      .where({
        userId: userId
      })
      .execute();

      room.playerCnt += 1;
      userRepository.save(room);
      res.send(response(baseResponse.SUCCESS));
    }
  } catch (error) {
    res.send(errResponse(baseResponse.JOIN_ROOM_ERROR));
  }
});

module.exports = router;