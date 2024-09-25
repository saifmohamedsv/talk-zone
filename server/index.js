const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db");
const Message = require("./models/message");
const userService = require("./service/user");
const Chat = require("./models/chat");
const authSockets = require("./sockets/auth");
const userSockets = require("./sockets/user");
const chatSockets = require("./sockets/chat");
const path = require("path");
require("dotenv").config();

const app = express();

const buildPath = path.normalize(path.join(__dirname, "../client/dist"));
app.use(express.static(buildPath));
connectDB();

const generalChat = [];
const chats = {};

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

app.get("/", async (req, res) => {});

// IO connection
io.on("connection", (socket) => {
  const chatId = socket.request._query.chatId;
  const isLoggedIn = socket.request._query.isLoggedIn;

  // if (!isLoggedIn) return;
  if (!chats[chatId]) {
    chats[chatId] = [];
  }

  chats[chatId].push(socket);

  // Sockets
  socket.on("login", authSockets.login(socket));

  socket.on("getMessages", async ({ token, chatId }) => {
    const decodedToken = userService.validateToken({ token });
    if (!decodedToken) {
      console.log("invalid token");
      return;
    }

    const messages = await Message.find({ chatId });
    console.log(messages);

    socket.emit("getMessages", messages);
  });

  socket.on("getChats", async ({ token }) => {
    const decodedToken = userService.validateToken({ token });
    if (!decodedToken) {
      console.log("invalid token");
      return;
    }

    const chats = await Chat.find({ ownerId: decodedToken?.userId });

    socket.emit("getChats", chats);
  });

  socket.on("otpVerification", authSockets.otpVerification(socket));

  socket.on("makePrivate", chatSockets.makePrivate);

  socket.on("inviteUsers", userSockets.inviteUsers);

  socket.on("message", async ({ message, token }) => {
    const currentChatId = message.chatId || "general";
    const decodedToken = userService.validateToken({ token });

    if (!decodedToken) {
      console.log("invalid token");
      return;
    }

    const newChat = { ownerId: decodedToken.userId, name: currentChatId };
    const chat = await Chat.findOneAndUpdate({ name: currentChatId }, { ...newChat });
    if (!chat) await Chat.create({ ...newChat });

    try {
      const newMessage = await Message.create({ ...message, sender: decodedToken.userId });
      console.log("Message saved");

      if (!chats[currentChatId]) return;
      chats[chatId].forEach((chat) => {
        if (chat === socket) return;
        chat.emit("message", newMessage);
      });
    } catch (error) {
      console.error("Error saving message to database", error);
    }
  });
});

server.listen(3000, () => {});
