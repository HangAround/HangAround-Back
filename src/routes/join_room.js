const express = require('express');
const router = express.Router();

const {User} = require("../entities/User");
const {Game} = require("../entities/Game");
const { getRepository, getConnection } = require("typeorm");

router.get('/join_room', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ex',async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(1);
  res.send(user);
});

router.get('/ex2',async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(2);
  res.send(user);
});

router.post('/', async (req,res,next)=> {
  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ 
        userId: req.body.userId, 
        snsId: req.body.snsId,
        userName: req.body.userName,
        channel: req.body.channel,
        roomId: req.body.roomId,
        createdAt: req.body.createdAt
      })
      .execute();
      
      res.status(200).json({
        success: true
      });

    } catch (error) {
      console.error(error);
      next(error);
    }
});

/*
router.post('/test', async connection => {
  
  const user = new User();
  //ver.1
  user.userId = 2;
  user.snsId = 2;
  user.userName = "sumin";
  user.channel = "kakao";
  user.roomId = null;
  user.createdAt = new Date();

  await connection.manager.save(user);
  //ver.2
  user.save((error, userInfo) => {
    if(error) return res.json({success: false, error})
    return res.status(200).json({
      success: true
    })
  })
  console.log("Saved a user");

});
*/

module.exports = router;
