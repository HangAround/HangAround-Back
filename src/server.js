const app = require('./index');


const webSocket = require('./socket');

const server = app.listen(app.get('port'), () => {
    console.log(`HangAround App Listening on PORT ${app.get('port')}`);
});


webSocket(server, app);
