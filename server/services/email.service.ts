import * as emailRepository from "../repository/email.repository";
import * as emailView from "../public/email/email.view";

const resetUrl = token => `${process.env.FRONTEND_HOST}/reset/${token}`;
const confirmUrl = token => `${process.env.FRONTEND_HOST}/confirm/${token}`;

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

export const sendConfirmEmailChange = (email, token) => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Confirm email change",
    html: emailView.confirmEmailChange(token, confirmUrl)
  };
  return emailRepository.send(msg);
};

export const sendConfirmPasswordChange = (email, token) => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Confirm password change",
    html: emailView.confirmPasswordChange(token, confirmUrl)
  };
  return emailRepository.send(msg);
};

export const sendWelcomeEmail = email => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Congratulation with registration",
    html: emailView.welcome()
  };
  return emailRepository.send(msg);
};
