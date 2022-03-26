const express = require('express');
const router = express.Router();
const { User } = require("../../entities/User");
const { Room } = require("../../entities/Room");
const { getRepository, getConnection } = require("typeorm");
const baseResponse = require("../../../config/baseResponseStatus");
const { errResponse, response } = require("../../../config/response");


router.get('/:userId/delete_room', async (req, res) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.params.userId);

    const roomRepository = getRepository(Room);
    const room = await roomRepository.findOne(user.room);

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
});
module.exports = router;