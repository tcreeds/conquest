var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

var idGen = 0;
var colors = ['red', 'green', 'blue']

io.on('connection', function (socket) {
    var addedUser = false;
    
    var id = ++idGen;
    var username = "Player " + id;
    
    socket.on('disconnect', function (data) {
        socket.broadcast.emit('playerLeft', {
            id: id
        });
    });
    
    var playerData = {
        username: username,
        id: id,
        color: colors[id % colors.length]
    };
    
    socket.broadcast.emit('playerJoined', playerData);
    socket.emit('connected', playerData);
  
});