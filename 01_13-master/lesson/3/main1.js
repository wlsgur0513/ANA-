const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const socket = io();

// 서버 입장
socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // 메시지를 텍스트화
    let msg = e.target.elements.msg.value;
  
    msg = msg.trim();
  
    if (!msg) {
      return false;
    }
  
    // 서버로 메시지 보내기
    socket.emit('chatMessage', msg);
  
    // 입력창 초기화
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}
  

// 서버 이름 표시
function outputRoomName(room) {
    roomName.innerText = room;
}
  
// 유저 목록 표시
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
}

// 서버를 떠나기전에 경고창 표시
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('정말로 서버를 떠나시겠습니까?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });