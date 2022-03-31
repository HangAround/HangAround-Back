const express = require('express');
const router = express.Router();
const { User } = require("../../entities/User");
const { Room } = require("../../entities/Room");
const { getRepository, getConnection } = require("typeorm");
const baseResponse = require("../../../config/baseResponseStatus");
const { errResponse, response } = require("../../../config/response");
const {isLoggedIn, verifyToken} = require("../middleware");

//room 정보 수정
router.patch('/:roomId/roomInfo', isLoggedIn, verifyToken, async (req, res) => {
    try {
        let roomId = req.params.roomId;
        let { roomName, maxPlayer } = req.body;

        let roomRepository = getRepository(Room);
        let room = await roomRepository.findOne({ roomId });

        if (maxPlayer < room.playerCnt || maxPlayer < 4 || maxPlayer > 6) {
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
});

//room 정보 조회
router.get('/:roomId/roomInfo', isLoggedIn, verifyToken, async (req, res) => {
    const roomRepository = getRepository(Room);
    const room = await roomRepository.findOne(req.params.roomId);
    if (!room) {
        res.send(errResponse(baseResponse.ROOM_ROOMID_NOT_EXIST));
    } else {
        res.send(response(baseResponse.SUCCESS, room));
    }
});

//room에 접속한 user 정보 조회
router.get('/:roomId/userInfo', isLoggedIn, verifyToken, async (req, res) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
        where: { room: req.params.roomId }
    })
    if (!users.length) {
        console.log("해당 방에 참여한 유저가 없습니다. 해당 방을 삭제합니다.");
        await getRepository(Room).delete(req.params.roomId);
        res.send(errResponse(baseResponse.USER_ROOMID_NOT_EXIST));
    } else {
        res.send(response(baseResponse.SUCCESS, users));
    }
});

//게임 선택
router.patch('/:roomId/gameStart/:gameId', isLoggedIn, verifyToken, async(req, res) => {
    const roomRepository = getRepository(Room);
    const room = await roomRepository.findOne(req.params.roomId);

    room.gameId = req.params.gameId;
    await roomRepository.save(room);

    res.send(response(baseResponse.SUCCESS));
});

//room 삭제 혹은 퇴장
router.delete('/:userId/delete_room', async (req, res) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.params.userId,{
        relations: ['room'],
    });
    const roomRepository = getRepository(Room);
    const room = await roomRepository.findOne(user.room);    

    if (room.gameId === 1) {
        if (room.ownerId === req.params.userId) {
            const users = await getRepository(User)
                .createQueryBuilder()
                .where({ room: room.roomId })
                .getMany();
            for (i = 0; i < users.length; i++) {
                await getConnection()
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        room: null
                    })
                    .where({
                        userId: users[i].userId
                    })
                    .execute();
            }
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Room)
                .where({ ownerId: req.params.userId })
                .execute();
            res.send(response(baseResponse.DELETE_ROOM_SUCCESS));
        }
        else {
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    room: null
                })
                .where({
                    userId: req.params.userId
                })
                .execute();
            res.send(response(baseResponse.EXIT_ROOM_SUCCESS));
        }
    }
    else {
        res.send(response(baseResponse.EXIT_ROOM_ERROR));
    }
});
module.exports = router;