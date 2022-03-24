const express = require('express');
const router = express.Router();

const {Room} = require("../../entities/Room");
const {User} = require("../../entities/User");

const {getRepository} = require("typeorm");
const {errResponse, response} = require("../../../config/response");
const {ROOM_ROOMID_NOT_EXIST, SUCCESS, USER_ROOMID_NOT_EXIST} = require("../../../config/baseResponseStatus");

const baseResponse = require("../../../config/baseResponseStatus");

router.patch('/:roomId/roomInfo', async (req, res)=> {
    try {
        let roomId = req.params.roomId;
        let {roomName, maxPlayer} = req.body;

        let roomRepository = getRepository(Room);
        let room = await roomRepository.findOne({roomId});

        if(maxPlayer < room.playerCnt || maxPlayer < 4 || maxPlayer > 6) {
            res.send(errResponse(baseResponse.ROOM_CAPACITY_ERROR));
        } else {
            room.maxPlayer = maxPlayer;
            room.roomName = roomName;
            await roomRepository.save(room);

            res.send(response(baseResponse.SUCCESS));
        }
    } catch (error) {
        res.send(errResponse(baseResponse.ROOMINFO_MODIFY_ERROR));
    }
})

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
    if (users.length == 0) {
        console.log("해당 방에 참여한 유저가 없습니다. 해당 방을 삭제합니다.");
        await getRepository(Room).delete(req.params.roomId);
        res.send(errResponse(USER_ROOMID_NOT_EXIST));
    } else {
        const room = await getRepository(Room)
            .update(req.params.roomId, {playerCnt: users.length});
        res.send(response(SUCCESS, users));
    }
});

module.exports = router;