import express from 'express';
import path from 'path';
import socket from 'socket.io';
import _ from 'lodash';
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
var title = 'Untitled Presentation';
var audience = [];
var speaker = {};
io.sockets.on('connection', (socket) => {

  socket.once('disconnect', () => {
    var memberIndex = _.findIndex(audience, {
      id: socket.id
    });

    if (memberIndex > -1) {
      audience.splice(memberIndex, 1);
      io.sockets.emit('audience', audience);
    } else if (socket.id === speaker.id) {
      title = 'Untitled Presentation';
      speaker = '';
      io.sockets.emit('end', {
        title: title,
        speaker: speaker
      });
    }

    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();

    console.log('Disconnected Socket \n Sockets remaining : %s',
      connections.length);
  });

  socket.emit('welcome', {
    title: title,
    audience: audience,
    speaker: speaker.name
  });

  // new audience memeber
  socket.on('join', (payLoad) => {
    var newMember = {
      id: socket.id,
      name: payLoad.name,
      type: 'audience'
    };

    audience.push(newMember);

    socket.emit('joined', newMember);

    io.sockets.emit('audience', audience);
  });

  // Speaker joins
  socket.on('start', (payLoad) => {
    title = payLoad.title;
    speaker = {
      id: socket.id,
      name: payLoad.name,
      type: 'speaker'
    };

    socket.emit('joined', speaker);

    io.sockets.emit('start', {
      title: payLoad.title,
      speaker: speaker.name
    });

  });

  connections.push(socket);
  console.log('Connected Sockets : %s',
    connections.length);
});
