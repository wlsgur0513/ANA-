const users = [];

// 새로운 유저 추가
function userJoin (id, username, room) {
    const user = { id, username, room };

    users.push(user);

    return user;
}

//현재 유저 확인
function getCurrentUser (id) {
    return users.find(user => user.id === id);
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}