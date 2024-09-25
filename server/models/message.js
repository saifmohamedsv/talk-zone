// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: {
    type: String,
    default: undefined,
  },
  sender: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
