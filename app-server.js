import server from './server';
import socket from 'socket.io';
import _ from 'lodash';
import questions from './app-questions';

let io = socket.listen(server);
let connections = [];
let title = 'Untitled Presentation';
let audience = [];
let speaker = {};
let currentQuestion = false;
let results = {
  'a': 0,
  'b': 0,
  'c': 0,
  'd': 0
};

io.sockets.on('connection', socket => {

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
        speaker: speaker,
        currentQuestion: false
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
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion,
    results: results
  });

  // new audience memeber
  socket.on('join', payLoad => {
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
  socket.on('start', payLoad => {
    title = payLoad.title;
    speaker = {
      id: socket.id,
      name: payLoad.name,
      type: 'speaker'
    };

    socket.emit('joined', speaker);

    io.sockets.emit('start', {
      title: payLoad.title,
      speaker: payLoad.name
    });
  });

  //speaker asks a question
  socket.on('ask', question => {
    currentQuestion = question;
    results = {
      'a': 0,
      'b': 0,
      'c': 0,
      'd': 0
    };
    io.sockets.emit('ask', currentQuestion);
  });

  socket.on('answer', payLoad => {
    results[payLoad.choice]++;
    io.sockets.emit('results', results);
  });

  connections.push(socket);
  console.log('Connected Sockets : %s',
    connections.length);
});
