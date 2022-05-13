const SocketIO = require('socket.io');
const randomConsonant = require('./routes/game/consonantGame');

module.exports = (server, app) => {
    const io = SocketIO(server);
    app.set('io', io);


    //네임스페이스 및 룸 세팅
    const gameRoom = io.of('/gameRoom');
    let roomCode, name;

    //socket connection
    gameRoom.on('connection', (socket) => {
        console.log('gameRoom 네임스페이스에 접속');

        //초성 알림
        socket.on('gameStart', async (data) => {
            const obj = JSON.parse(data);
            roomCode = obj.roomCode;
            name = obj.name;

            let consonant = randomConsonant.randomConsonant();
            socket.to(roomCode).emit('consonant', { 'consonant': consonant });
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
        socket.on('userName', (data) => {
            roomCode = data.roomCode;
            socket.join(roomCode);
            app.get('io').of('/consonantGame').to(roomCode).emit('notice', `${data.userName}님 정답입니다!`);
        });

    });

    gameRoom.on('disconnect', () => {
        console.log('room 네임스페이스 접속 해제');
    });
};
