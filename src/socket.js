const SocketIO = require('socket.io');
const consonantGame = require('./routes/game/consonantGame');

module.exports = (server, app) => {
    const io = SocketIO(server);
    app.set('io', io);

    //네임스페이스 및 룸 세팅
    const consonantGame = io.of('/consonantGame');
    let rooms = [];

    consonantGame.on('connection', (socket) => {
        console.log('gameRoom 네임스페이스에 접속');
        let roomCode, name;

        //게임 시작, 방에 join하고 랜덤 초성 알림
        socket.on('gameStart', (data) => {
            const obj = JSON.parse(data);
            roomCode = obj.roomCode;
            name = obj.name;

            if(!rooms.includes(roomCode)) {
                rooms.push(roomCode);
            }
            console.log(rooms);
            socket.join(roomCode, () => {
                console.log('join');
                console.log(name + ' join a ' + roomCode);
                let consonant = consonantGame.randomConsonant();
                consonantGame.to(roomCode).emit('consonant', {'consonant': consonant});

            });
            console.log('test end');
        });

        //타이머 세팅
        socket.on('response', () => {
            const timeout = setTimeout(() => {
                console.log('timeOver');
                consonantGame.to(roomCode).emit('timeOver');
            }, 180000);
            console.log("3분 타이머 세팅")
            consonantGame.to(roomCode).emit('timerStart');
        })


        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

};
