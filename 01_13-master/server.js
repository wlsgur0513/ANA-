const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chat Bot';

// 클라이언트가 접속했을때 실행
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // 유저 환영
    socket.emit('message', formatMessage(botName, `${username}님 서버 입장 환영합니다!`));

    // 유저 접속시 전송(접속 유저 제외)
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username}님이 서버에 접속하셨습니다.`)
      );

    // 유저 목록과 서버의 정보 전송
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // 받은 메시지 읽기
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // 클라이언트의 연결이 끊어졌을때 실행
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username}님이 서버를 떠나셨습니다.`)
      );

      // 유저 목록과 서버의 정보 전송
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = 3000;

server.listen(PORT, () =>
    console.log(`${PORT}포트에서 서버 실행`)
);
