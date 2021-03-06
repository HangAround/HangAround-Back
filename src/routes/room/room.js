const express = require('express');
const router = express.Router();
const {User} = require("../../entities/User");
const {Room} = require("../../entities/Room");
const {getRepository, getConnection, createQueryBuilder} = require("typeorm");
const baseResponse = require("../../../config/baseResponseStatus");
const {errResponse, response} = require("../../../config/response");
const {isLoggedIn, verifyToken} = require("../middleware");
const {Liar} = require("../../entities/Liar");

//room 정보 수정
router.patch('/:roomCode/roomInfo',  verifyToken, async (req, res) => {
    try {
        let roomCode = req.params.roomCode;
        let {roomName, maxPlayer} = req.body;

        let roomRepository = getRepository(Room);
        let room = await roomRepository.findOne({roomCode});

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

//room 정보 조회 (예지)
router.get('/:roomCode/roomInfo', verifyToken, async (req, res) => {
    const roomRepository = getRepository(Room);
    const room = await roomRepository.findOne({roomCode: req.params.roomCode});
    if (!room) {
        res.send(errResponse(baseResponse.ROOM_ROOMID_NOT_EXIST));
    } else {
        res.send(response(baseResponse.SUCCESS, room));
    }
});

//room에 접속한 user 정보 조회 (예지)
router.get('/:roomCode/userInfo',  verifyToken, async (req, res) => {
    const users = await createQueryBuilder('User', 'user')
        .innerJoinAndSelect("user.room", 'room')
        .select(['user.userId', 'user.userName', 'room.roomCode'])
        .where({room: {roomCode: req.params.roomCode}})
        .getMany();

    if (!users.length) {
        res.send(errResponse(baseResponse.USER_ROOMID_NOT_EXIST));
    } else {
        res.send(response(baseResponse.SUCCESS, users));
    }
});

//게임 선택
router.patch('/:roomCode/gameStart/:gameId',  verifyToken, async (req, res) => {
    const roomRepository = getRepository(Room);
    const room = await roomRepository.findOne(req.params.roomCode);

    room.gameId = req.params.gameId;
    await roomRepository.save(room);

    res.send(response(baseResponse.SUCCESS));
});

router.delete('/:roomCode/end_game',  verifyToken, async (req, res) => {
    let roomRepository = getRepository(Room);
    let room = await roomRepository.findOne({roomCode: req.params.roomCode});
    // 라이어게임 데이터 삭제
    if (room.gameId === 2) {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Liar)
            .where({
                roomId: room.roomId
            })
            .execute();
    } else if (room.gameId === 3) {
        // 초성 게임 데이터 삭제
    } else {
        // 고요 속의 외침 데이터 삭제
    }
    room.gameId = 1;
    await roomRepository.save(room);
    res.send(response(baseResponse.SUCCESS));
});

//room 삭제 혹은 퇴장 ()
router.delete('/:roomCode/delete_room/:userId', verifyToken, async (req, res) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.params.userId, {
        relations: ['room'],
    });
    const roomRepository = getRepository(Room);
    const room = await roomRepository.findOne(user.room);

    if (room.gameId === 1) {
        if (room.ownerId === req.params.userId) {
            const users = await getRepository(User)
                .createQueryBuilder()
                .where({room: room.roomId})
                .getMany();
            for (let i = 0; i < users.length; i++) {
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
                .where({ownerId: req.params.userId})
                .execute();
            res.send(response(baseResponse.DELETE_ROOM_SUCCESS));
        } else {
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
    } else {
        res.send(response(baseResponse.EXIT_ROOM_ERROR));
    }
});
module.exports = router;