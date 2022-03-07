const app = require('./index');

app.listen(app.get('port'), () => {
    console.log(`HangAround App Listening on PORT ${app.get('port')}`);
});
