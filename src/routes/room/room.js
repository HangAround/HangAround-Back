const express = require('express');
const router = express.Router();

const {Room} = require("../../entities/Room");

const {getRepository} = require("typeorm");
const {response, errResponse} = require("../../../config/response");
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

module.exports = router;