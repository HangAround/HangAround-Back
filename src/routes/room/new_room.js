const express = require('express');
const router = express.Router();
const {getRepository, getConnection} = require("typeorm");
const {Room} = require("../../entities/Room");
const baseResponse = require("../../../config/baseResponseStatus");
const {isLoggedIn, verifyToken} = require("../middleware");
const {response, errResponse} = require("../../../config/response");

let roomCode = Math.random().toString(36).slice(2);


router.get('/', (req, res) => {
    let json_room_code = {'roomCode': roomCode};
    res.send(response(baseResponse.SUCCESS, json_room_code));
})

router.post('/',  verifyToken, async (req, res) => {
    const {roomName, maxPlayer, userId} = req.body;

    if (!roomName)
        return res.send(errResponse(baseResponse.ROOM_NAME_EMPTY));
    else {
        let flag = 0;
        while (!flag) {
            let roomRepository = getRepository(Room);
            room = await roomRepository.findOne({roomCode});
            if (!room) {
                try {
                    await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(Room)
                        .values({
                            roomName: roomName,
                            maxPlayer: maxPlayer,
                            roomCode: roomCode,
                            ownerId: userId,
                            playerCnt: 0,
                            gameId: 1
                        })
                        .execute()
                    flag = 1;
                    res.send(response(baseResponse.SUCCESS));
                } catch (error) {
                    res.send(errResponse(baseResponse.NEW_ROOM_ERROR));
                }
            } else {
                roomCode = Math.random().toString(36).slice(2);
            }
        }
    }
});

module.exports = router;