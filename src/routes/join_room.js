const express = require('express');
const router = express.Router();

const {User} = require("../entities/User");
const {Room} = require("../entities/Room");

const {getRepository, getConnection} = require("typeorm");
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");

router.get('/join_room', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ex', async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(5);
  res.send(user);
});

router.put('/', async (req,res,next)=> {
  try {
    const {userId, userName, roomCode} = req.body;

    const userRepository = getRepository(Room);
    const room = await userRepository.findOne({roomCode: roomCode});
    if(room == undefined) {
      res.send(response(baseResponse.ROOM_CODE_ERROR));
    }
    
    if(!userName) {
      res.send(response(baseResponse.USER_NAME_EMPTY));
    }
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
  } catch (error) {
    res.send(response(baseResponse.JOIN_ROOM_ERROR));
  }
});

module.exports = router;