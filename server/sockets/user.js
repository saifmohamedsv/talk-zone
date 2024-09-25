const Chat = require("../models/chat");
const userService = require("../service/user");

const inviteUsers = async ({ token, chatId, invitedUser }) => {
  const decodedToken = userService.validateToken({ token });
  if (!decodedToken) return;
  await userService.inviteUsers({ chatId, invitedUser });
};

module.exports = { inviteUsers };
