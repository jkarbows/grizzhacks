var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
    console.log('posted');
});

io.on('connection', function(socket) {
    console.log('someone connected');
});

http.listen(80, function() {
    console.log('listening to u like the nsa');
});