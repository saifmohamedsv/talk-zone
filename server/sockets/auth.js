const jwt = require("jsonwebtoken");
const userService = require("../service/user");

const login = (socket) => async (email) => {
  await userService.login(email);
  socket.emit("otpSent");
};

const otpVerification =
  (socket) =>
  async ({ otp, email }) => {
    const result = await userService.verifyOtp({ otp, email });
    const decodedToken = jwt.verify(result, process.env.JWT_SECRET);
    if (!result) socket.emit("otpFailed");
    else socket.emit("otpSuccess", { token: result, userId: decodedToken.userId });
  };

module.exports = { login, otpVerification };
