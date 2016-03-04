import express from 'express';
import path from 'path';
import socket from 'socket.io';

var app = express();

app.use(express.static(path.resolve(__dirname, './public/')));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {
    root: 'public/'
  });
});

var server = app.listen(5000);
var io = socket.listen(server);
var connections = [];
var title ='Untitled Presentation';
io.sockets.on('connection', (socket) => {

  socket.once('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected Socket \n Sockets remaining : %s',
      connections.length);
  });

  socket.emit('welcome', {title: title});
  connections.push(socket);
  console.log('Connected Sockets : %s',
    connections.length);
});
