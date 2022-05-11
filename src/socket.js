const SocketIO = require('socket.io');


module.exports = (server, app) => {
    const io = SocketIO(server);

    app.set('io', io);

    io.on('connection', (socket) => {
        socket.on('ping', msg => {
            console.log(msg);
            //socket.emit('pong', {comment: "여기선 이렇게"+'\n'});
        })
    });

    const gameRoom = io.of('/consonantGame');

    gameRoom.on('connection', (socket) => {

        socket.on('userId', (data) => {
            let roomCode = data.roomCode;
            socket.join(roomCode); //룸 접속
            app.get('io').of('/consonantGame').to(roomCode).emit('notice', `${data.userId}님 정답입니다!`);
        });

        socket.on('disconnect', () => {
            socket.leave(roomCode);
        });
    });
};
