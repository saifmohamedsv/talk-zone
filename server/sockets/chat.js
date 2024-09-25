const Chat = require("../models/chat");
const userService = require("../service/user");

const makePrivate = async ({ token, chatId }) => {
  const decodedToken = userService.validateToken({ token });
  if (!decodedToken) return;
  await Chat.updateOne({ name: chatId, ownerId: decodedToken.userId }, { privacy: 1 });
};

module.exports = { makePrivate };
