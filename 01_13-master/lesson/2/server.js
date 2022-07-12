const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;

server.listen(PORT, () => 
    console.log(`${PORT}포트에서 서버 실행`)
);