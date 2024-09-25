const { Resend } = require("resend");
require("dotenv").config();

async function sendEmail(email, otp) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "Saif Mohamed <onboarding@resend.dev>",
    to: email,
    subject: "Please verify your email",
    html: `<p>Please use this one time password: ${otp}</p>`,
  });
}

async function sendInviteEmail(email, url) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "Saif Mohamed <onboarding@resend.dev>",
    to: email,
    subject: "Someone Invited you to a chat.",
    html: `<p>Please accept my invite to a secret chat: ${url}. Love you ❤️</p>`,
  });
}

module.exports = { sendEmail, sendInviteEmail };
