const SocketIO = require('socket.io');
const randomConsonant = require('./routes/game/consonantGame');

module.exports = (server, app) => {
    const io = SocketIO(server);
    app.set('io', io);

    //네임스페이스 및 룸 세팅
    const gameRoom = io.of('/gameRoom');
    let rooms = [];
    let roomCode, name;

    //socket connection
    gameRoom.on('connection', (socket) => {
        console.log('gameRoom 네임스페이스에 접속');

        //room 입장
        socket.on('join', (data) => {
            const obj = JSON.parse(data);
            roomCode = obj.roomCode;
            name = obj.name;

            if (rooms.findIndex(room => room.roomCode === roomCode) === -1) {
                //만약 roomCode 일치하는 room 없으면 새로운 room 객체(roomCode, 현재인원) 생성 후 room 객체 배열에 집어넣음
                let roomInfo = {'roomCode': roomCode, 'cnt': 1}
                rooms.push(roomInfo);
            } else {
                //만약 일치하는 room 있으면 현재인원만 +1
                let index = rooms.findIndex(room => room.roomCode === roomCode);
                rooms[index].cnt++;
            }
            socket.join(roomCode);
            socket.to(roomCode).emit('join', {
                msg: `${name}님이 입장했습니다.`
            });
            console.log(name + ' join a ' + roomCode);
        });

        socket.on('gameStart', async () => {
            //초성 알림
            let consonant = randomConsonant.randomConsonant();
            socket.to(roomCode).emit('consonant', {'consonant': consonant});
            console.log('consonant is ' + consonant);
        });

        socket.on('response', () => {
            setTimeout(() => {
                console.log('timeOver');
                socket.to(roomCode).emit('timeOver', {
                    msg: `타이머가 종료되었습니다.`
                });
            }, 180000);
            console.log("3분 타이머 세팅")
            socket.to(roomCode).emit('timerStart',{
                msg: `타이머가 세팅되었습니다.`
            });
        });

    });

    gameRoom.on('disconnect', () => {
        console.log('room 네임스페이스 접속 해제');
    });

};
