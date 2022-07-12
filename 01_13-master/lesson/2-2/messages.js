const moment = require('momnet');  //모듈 불러오기

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage; // 특정 함수 수출