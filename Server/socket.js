const { Server } = require('socket.io');
const http = require('http');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on('disconnect', () => {
      console.log("User disconnected");
    });
  });

  return io;
}

module.exports = { initializeSocket, io };
