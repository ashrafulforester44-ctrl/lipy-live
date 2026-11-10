const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('phone-stream', (data) => {
        socket.broadcast.emit('laptop-view', data);
    });
});

server.listen(PORT, () => console.log('Live on ' + PORT));