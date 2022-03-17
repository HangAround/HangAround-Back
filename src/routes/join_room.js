const express = require('express');
const router = express.Router();

const {User} = require("../entities/User");
const {Room} = require("../entities/Room");
const {getRepository, getConnection} = require("typeorm");
const baseResponseStatus = require("../../config/baseResponseStatus");

router.get('/join_room', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ex',async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(1);
  res.send(user);
});

router.post('/', async (req,res,next)=> {
  try {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        userName: req.body.userName
      })
      .where({
        userId: req.body.userId
      })
      .execute();

    var userRepository = getRepository(Room);
    var room = await userRepository.findOne({roomCode: req.body.roomCode});
    room.playerCnt += 1;
    userRepository.save(room);

    res.send(baseResponseStatus.SUCCESS);

  } catch (error) {
    console.error(error);
    next(baseResponseStatus.JOIN_ROOM_ERROR);
  }
});

module.exports = router;