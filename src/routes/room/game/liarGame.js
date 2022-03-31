const express = require('express');
const router = express.Router();
const { User } = require("../../../entities/User");
const { Room } = require("../../../entities/Room");
const { LiarData } = require("../../../entities/LiarData");
const { getRepository, getConnection } = require("typeorm");
const baseResponse = require("../../../../config/baseResponseStatus");
const { errResponse, response } = require("../../../../config/response");
const { isLoggedIn, verifyToken } = require("../../middleware");

//라이어 및 제시어 랜덤 배정
router.post('/:liarCategory', async (req, res) => {
    const liarDataRepository = getRepository(LiarData);
    const liarData = await liarDataRepository.findOne({
        where: { liarDataId: req.params.liarAnswerId }
    });
});

//liarAnswerId를 통해 해당 카테고리의 liar data 전달
router.post('/:liarAnswerId', isLoggedIn, verifyToken, async (req, res) => {
    const liarDataRepository = getRepository(LiarData);
    const liarData = await liarDataRepository.findOne({
        where: { liarDataId: req.params.liarAnswerId }
    });

    if ((liarData.liarDataId % 25) === 0) {
        var category = parseInt(liarData.liarDataId / 25);
    } else {
        var category = parseInt(liarData.liarDataId / 25) + 1;
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