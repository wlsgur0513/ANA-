const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { getRoomUsers } = require('../../utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chat Bot';

io.on('connection', socket => {
    socket.on('joinRoom', ({ user, room }) => {
        const user = usrJoin(socket.id, username, room);

        socket.join(user.room);
        
        socket.emit('message', formatMessage(botName, `${username}님이 서버 접속 환영합니다.`));

        socket.broadcast
            .to(user.room)
            .emit('message',
            formatMessage(botName, `${user.usrname}님이 서버에 접속하셨습니다.`)
        );

        io.to(user.room).emit('roomUser', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
});


const PORT = 3000;

server.listen(PORT, () => 
    console.log(`${PORT}포트에서 서버 실행`)
);