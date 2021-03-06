const SocketIO = require('socket.io');
const randomConsonant = require('./routes/game/consonantGame');
const {Room} = require("./entities/Room");
const {getRepository} = require("typeorm");
const {clearTimeout} = require("timers");

module.exports = (server, app) => {

    const io = SocketIO(server, {
        cors: {origin: "*"},
    });
    app.set('io', io);

    //네임스페이스 및 룸 세팅
    const gameRoom = io.of('/gameRoom');
    let roomCode, name;
    let count = 0;
    let players = 0;
    let timers = [];

    //socket connection
    gameRoom.on('connection', (socket) => {
        console.log('gameRoom 네임스페이스에 접속');
        //room 입장
        socket.on('join', (data) => {
            roomCode = data.roomCode;
            name = data.name;
            socket.join(roomCode);
            gameRoom.in(roomCode).emit('join', {
                msg: `${name}님이 입장했습니다.`
            });
            console.log(name + ' join a ' + roomCode);
        });

        //초성 알림
        socket.on('gameStart', (data) => {
            count = 0;
            timers = [];
            roomCode = data.roomCode;
            let consonant = randomConsonant.randomConsonant();
            gameRoom.in(roomCode).emit('consonant', {consonant: consonant});
            console.log('consonant is ' + consonant);
        });

        //타이머 셋팅
        socket.on('response', () => {
            let timerId = setTimeout(() => {
                console.log('timeOver');
                gameRoom.to(socket.id).emit('timeOver', {
                    msg: `타이머가 종료되었습니다.`
                });
            }, 180000);
            console.log("3분 타이머 세팅");
            gameRoom.to(socket.id).emit('timerStart', {
                msg: `타이머가 세팅되었습니다.`
            });
            timers.push(timerId);
        });

        //정답자 공지
        socket.on('userName', async (data) => {
            roomCode = data.roomCode;
            let roomRepository = getRepository(Room);
            let room = await roomRepository.findOne({roomCode});
            if (room !== undefined) {
                players = room.playerCnt;
                console.log(players);
                if (count === players - 1) {
                    app.get('io').of('/gameRoom').in(roomCode).emit('gameOver', `게임이 종료되었습니다.`);
                    console.log("게임이 종료, 타이머를 중지합니다.");
                    timers.forEach((timer) => clearTimeout(timer));

                } else {
                    count++;
                    app.get('io').of('/gameRoom').in(roomCode).emit('notice', `${data.userName}님 정답입니다!`);
                    //게임 종료 공지
                    if (count === players - 1) {
                        app.get('io').of('/gameRoom').in(roomCode).emit('gameOver', `게임이 종료되었습니다.`);
                        console.log("게임 종료, 타이머를 중지합니다.");
                        timers.forEach((timer) => clearTimeout(timer));
                    }
                }
            } else {
                console.log('room from database is not defined!');
            }
        });

    });

    gameRoom.on('disconnect', () => {
        gameRoom.leave(roomCode);
        gameRoom.disconnect();
        console.log('gameRoom 네임스페이스 접속 해제');
    });
};
