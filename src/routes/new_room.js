const express = require('express');
const router = express.Router();
const { getRepository, getConnection } = require("typeorm");
const {Room} = require("../entities/Room");

router.post('/', async (req,res,next)=> {
  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Room)
      .values({ 
        roomId: req.body.roomId, 
        roomName: req.body.roomName,
        maxPlayer: req.body.maxPlayer,
        gameId: 0 //일단 new_room에서는 무조건 default_game으로 주기
      })
      .execute()
      res.status(200).json({
        success: true
      });
    } catch (error) {
        console.error(error);
        next(error);
      }
});

module.exports = router;