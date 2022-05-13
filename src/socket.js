const SocketIO = require('socket.io');


module.exports = (server, app) => {
    const io = SocketIO(server);

    app.set('io', io);

    io.on('connection', (socket) => {
        socket.on('ping', msg => {
            console.log(msg);
        })
    });

    const gameRoom = io.of('/consonantGame');

    gameRoom.on('connection', (socket) => {

        socket.on('userName', (data) => {
            let roomCode = data.roomCode;
            socket.join(roomCode); //룸 접속
            app.get('io').of('/consonantGame').to(roomCode).emit('notice', `${data.userName}님 정답입니다!`);
            console.log(io.sockets.adapter.rooms.get);
            console.log('JOIN ROOM LIST', io.sockets.adapter.rooms);
        });

        socket.on('disconnect', () => {
            socket.leave(roomCode);
        });
    });
};
