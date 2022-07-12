const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

document.getElementById('btn').addEventListener('click', () => {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = '김형진';
    p.innerHTML += `<span>9:00</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = '원하시는 대화를 적어주세요';
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
});

// 서버를 떠나기전에 경고창 표시
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('정말로 서버를 떠나시겠습니까?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });