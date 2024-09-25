const User = require("../models/user");
const { sendEmail, sendInviteEmail } = require("./email");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function login(email) {
  const otp = Math.floor(100000 + Math.random() * 90000);
  await sendEmail(email, otp);

  const user = await User.findOneAndUpdate({ email }, { otp });

  if (!user) await User.create({ email, otp });
}

async function verifyOtp({ email, otp }) {
  const user = await User.findOne({ email, otp });
  if (!user) return false;
  else {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return token;
  }
}

function validateToken({ token }) {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
  } catch (error) {
    return false;
  }
}

async function inviteUsers({ chatId, invitedUser }) {
  const url = `${process.env.CLIENT_BASE_URL}?chatId=${chatId}`;
  await sendInviteEmail(invitedUser, url);
}

module.exports = { login, verifyOtp, validateToken, inviteUsers };
