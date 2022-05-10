const SocketIO = require('socket.io');


module.exports = (server, app) => {
    const io = SocketIO(server);

    io.on('connection', (socket) => {
    console.log('소켓 접속');

    socket.on('ping',msg => {
        console.log(msg);
    })
    });

    app.set('io', io);
    const gameRoom = io.of('/consonantGame');

    gameRoom.on('connection', (socket) => {
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

};
