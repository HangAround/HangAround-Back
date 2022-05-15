const SocketIO = require('socket.io');
const randomConsonant = require('./routes/game/consonantGame');
const {Room} = require("./entities/Room");
const {getRepository} = require("typeorm");

module.exports = (server, app) => {
    const io = SocketIO(server, {
        cors: {origin: "*"},
        methods: ["GET", "POST"]
    });
    app.set('io', io);

    //네임스페이스 및 룸 세팅
    const gameRoom = io.of('/gameRoom');
    let roomCode, name;
    let count = 0;
    let players = 0;

    //socket connection
    gameRoom.on('connection', (socket) => {
        console.log('gameRoom 네임스페이스에 접속');

        //room 입장
        socket.on('join', (data) => {
            roomCode = data.roomCode;
            name = data.name;
            socket.join(roomCode);
            socket.to(roomCode).emit('join', {
                msg: `${name}님이 입장했습니다.`
            });
            console.log(name + ' join a ' + roomCode);
        });

        //초성 알림
        socket.on('gameStart', (data) => {
            roomCode = data.roomCode;
            let consonant = randomConsonant.randomConsonant();
            socket.to(roomCode).emit('consonant', {'consonant': consonant});
            console.log('consonant is ' + consonant);
        });

        //타이머 셋팅
        socket.on('response', () => {
            setTimeout(() => {
                console.log('timeOver');
                socket.to(roomCode).emit('timeOver', {
                    msg: `타이머가 종료되었습니다.`
                });
            }, 180000);
            console.log("3분 타이머 세팅")
            socket.to(roomCode).emit('timerStart', {
                msg: `타이머가 세팅되었습니다.`
            });
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
                    app.get('io').of('/gameRoom').to(roomCode).emit('gameOver', `게임이 종료되었습니다.`);
                } else {
                    count++;
                    app.get('io').of('/gameRoom').to(roomCode).emit('notice', `${data.userName}님 정답입니다!`);
                    //게임 종료 공지
                    if (count === players - 1) {
                        app.get('io').of('/gameRoom').to(roomCode).emit('gameOver', `게임이 종료되었습니다.`);
                    }
                }
            } else {
                console.log('room from database is not defined!');
            }
        });

    });

    gameRoom.on('disconnect', () => {
        console.log('room 네임스페이스 접속 해제');
    });
};
