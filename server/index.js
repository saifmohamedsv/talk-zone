const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const sockets = [];

app.get("/", (req, res) => {
  res.send("Hello from server.");
});

io.on("connection", (socket) => {
  sockets.push(socket);
  socket.on("message", (message) => {
    sockets.forEach((s) => {
      if (s === socket) return;
      s.emit("message", message);
    });
  });
});

server.listen(3000, () => {});
