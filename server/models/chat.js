// models/Message.js
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  privacy: {
    type: Number,
    default: 0,
  },
  ownerId: {
    type: String,
    default: null,
  },
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
