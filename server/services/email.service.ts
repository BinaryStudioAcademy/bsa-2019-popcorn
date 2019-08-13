import * as emailRepository from "../repository/email.repository";

const resetUrl = token => `${process.env.FRONTEND_HOST}/reset/${token}`;

export const sendToken = (email, token) => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Reset password",
    html: `<p>You requested for a password reset, kindly use this <a href="${resetUrl(
      token
    )}">link</a> to reset your password</p>`
  };
  return emailRepository.send(msg);
};
