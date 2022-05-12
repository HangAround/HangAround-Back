const SocketIO = require('socket.io');
const randomConsonant = require('./routes/game/consonantGame');
const {Room} = require("./entities/Room");

const {getRepository} = require("typeorm");

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
        socket.on('gameStart', async (data) => {
            const obj = JSON.parse(data);
            roomCode = obj.roomCode;
            name = obj.name;

            console.log('findIndex: ' + rooms.findIndex(room => room.roomCode === roomCode));
            if (rooms.findIndex(room => room.roomCode === roomCode) === -1) {    //만약 없으면 객체(roomCode, 현재인원) 생성 후 집어넣음
                let roomInfo = {'roomCode': roomCode, 'cnt': 1}
                rooms.push(roomInfo);
                socket.join(roomCode);
                console.log(name + ' join a ' + roomCode);
            } else {  //만약 있으면 현재인원만 +1
                let index = rooms.findIndex(room => room.roomCode === roomCode);
                rooms[index].cnt++;
                socket.join(roomCode);
                console.log(name + ' join a ' + roomCode);

                //만약 방 인원과 현재인원이 동일하면 초성 알림
                let roomRepository = getRepository(Room);
                let room = await roomRepository.findOne({roomCode});
                if (room !== undefined) {
                    if (room.playerCnt === rooms[index].cnt) {
                        let consonant = randomConsonant.randomConsonant();
                        consonantGame.to(roomCode).emit('consonant', {'consonant': consonant});
                        console.log('consonant is ' + consonant);
                    }
                }else{
                    console.log('room from database is not defined!');
                }
                console.log(rooms); //지우기
            }

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
