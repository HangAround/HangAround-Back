const express = require('express');
const router = express.Router();
const { Liar } = require("../../entities/Liar");
const { User } = require("../../entities/User");
const { Room } = require("../../entities/Room");
const { LiarData } = require("../../entities/LiarData");
const { getRepository, getConnection } = require("typeorm");
const baseResponse = require("../../../config/baseResponseStatus");
const { errResponse, response } = require("../../../config/response");
const { isLoggedIn, verifyToken } = require("../middleware");


//라이어 및 제시어 랜덤 배정
router.post('/:roomCode/liarGame/settings/:liarCategory', isLoggedIn, verifyToken, async (req, res) => {
    const roomRepository = getRepository(Room);
    const room = await roomRepository.findOne({
        where: { roomCode: req.params.roomCode }
    });

    const liar_num = Math.floor(Math.random() * (room.playerCnt)) + 1;
    const users = await getRepository(User)
        .createQueryBuilder()
        .where({ room: room.roomId })
        .getMany();

    const liarDataRepository = getRepository(LiarData);
    const liarData_temp = await liarDataRepository.findOne({
        where: { liarCategory: req.params.liarCategory }
    });
    const category = parseInt(liarData_temp.liarDataId / 25 );

    const answer_num = Math.floor(Math.random() * 25) + 1;
    
    const liarData = await liarDataRepository.findOne({
        where: { liarDataId: (category - 1) * 25 + answer_num }
    });

    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Liar)
        .values({
            roomId: room.roomId,
            liarAnswerId: (category - 1) * 25 + answer_num
        })
        .execute()

    const j_liar = { 'userId': parseInt(users[liar_num - 1].userId) };
    const j_dataId = { 'liarDataId': liarData.liarDataId };
    const j_category = { 'liarCategory': liarData.liarCategory};
    const j_keyword = { 'liarKeyword': liarData.liarKeyword };

    res.send(response(baseResponse.SUCCESS, Object.assign(j_liar, j_dataId, j_category, j_keyword)));
});

//liarAnswerId를 통해 해당 카테고리의 liar data 전달
router.get('/:roomCode/liarGame/:liarAnswerId', isLoggedIn, verifyToken, async (req, res) => {
    const liarDataRepository = getRepository(LiarData);
    const liarData = await liarDataRepository.findOne({
        where: { liarDataId: req.params.liarAnswerId }
    });

    let category = 0;
    if ((liarData.liarDataId % 25) === 0) {
        category = parseInt(liarData.liarDataId / 25);
    } else {
        category = parseInt(liarData.liarDataId / 25) + 1;
    }

    const numberArray = Array.from({ length: 25 }, (v, i) => i);
    for (let j = 0; j < numberArray.length; j++) {
        numberArray[j] = numberArray[j] + 25 * (category - 1) + 1;
    }

    const liarDataList = await liarDataRepository.createQueryBuilder()
        .whereInIds(numberArray)
        .getMany();

    res.send(response(baseResponse.SUCCESS, liarDataList));
});

module.exports = router;