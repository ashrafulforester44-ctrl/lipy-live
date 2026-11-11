const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.static(path.join(__dirname, 'public')));
app.get('/phone', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'phone.html'));
});
io.on('connection', (socket) => {
  socket.on('phone-stream', (data) => {
    socket.broadcast.emit('laptop-view', data);
  });
});
socket.on('phone-audio', (data) => {
    io.emit('laptop-audio', data);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
