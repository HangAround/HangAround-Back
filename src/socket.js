const SocketIO = require('socket.io');

const {Room} = require("./entities/Room");
const {getRepository} = require("typeorm");

module.exports = (server, app) => {
    const io = SocketIO(server);
    app.set('io', io);

    io.on('connection', (socket) => {
        console.log('소켓 접속');

        socket.on('ping',msg => {
            console.log(msg);
        })
    });

    const gameRoom = io.of('/consonantGame');

    gameRoom.on('connection', (socket) => {
        console.log('game 네임스페이스에 접속');

        let count = 0;
        let roomCode = "";
        let players = 0;
        socket.on('userName', async (data) => {
            roomCode = data.roomCode;
            socket.join(roomCode); //룸 접속

            let roomRepository = getRepository(Room);
            let room = await roomRepository.findOne({roomCode});
            if (room !== undefined) {
                players = room.playerCnt;
                console.log(players);
                if(count === players-1) {
                    app.get('io').of('/consonantGame').to(roomCode).emit('gameOver', `게임이 종료되었습니다.`);
                } else {
                    count++;
                    app.get('io').of('/consonantGame').to(roomCode).emit('notice', `${data.userName}님 정답입니다!`);
                    if(count === players-1) {
                        app.get('io').of('/consonantGame').to(roomCode).emit('gameOver', `게임이 종료되었습니다.`);
                    }
                }
            } else {
                console.log('room from database is not defined!');
            }
        });

        socket.on('disconnect', () => {
            console.log('game 네임스페이스 접속 해제');
            socket.leave(roomCode);
        });
    });
};
