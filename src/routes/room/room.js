const express = require('express');
const {Room} = require("../../entities/Room");
const {getRepository} = require("typeorm");
const {errResponse, response} = require("../../../config/response");
const {ROOM_ROOMID_NOT_EXIST, SUCCESS, USER_ROOMID_NOT_EXIST} = require("../../../config/baseResponseStatus");
const {User} = require("../../entities/User");
const router = express.Router();


//room 정보 조회
router.get('/:roomId', async (req, res) => {
    const roomRepository = getRepository(Room);
    const room = await roomRepository.findOne(req.params.roomId);
    if (!room) {
        res.send(errResponse(ROOM_ROOMID_NOT_EXIST));
    } else {
        res.send(response(SUCCESS, room));
    }
});

//room에 접속한 user 정보 조회
router.get('/:roomId/userInfo', async (req, res) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
        where: {room: req.params.roomId}
    })
    if(users.length == 0){
        console.log("해당 방에 참여한 유저가 없습니다. 해당 방을 삭제합니다.");
        res.send(errResponse(USER_ROOMID_NOT_EXIST));
    }else{
        res.send(response(SUCCESS,users));
    }
});

module.exports = router;