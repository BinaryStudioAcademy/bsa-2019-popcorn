import * as emailRepository from "../repository/email.repository";

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
    html: `<p align='center'>You requested for an email change, please click the button to confirm it.</p>
    <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff6501;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #ff6501;border-right:1px solid #ff6501;border-bottom:1px solid #ff6501;border-left:1px solid #ff6501;padding-top:5px;padding-bottom:5px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;">
<span style="font-size: 16px; line-height: 32px;"><a style="color:white; text-decoration:none;" href="${confirmUrl(
      token
    )}">Confirm</a></span>
</span></div>`
  };
  return emailRepository.send(msg);
};

export const sendConfirmPasswordChange = (email, token) => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Confirm password change",
    html: `<p align='center'>You requested for a password change, please click the button to confirm it.</p>
    <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff6501;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #ff6501;border-right:1px solid #ff6501;border-bottom:1px solid #ff6501;border-left:1px solid #ff6501;padding-top:5px;padding-bottom:5px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;">
<span style="font-size: 16px; line-height: 32px;"><a style="color:white; text-decoration:none;" href="${confirmUrl(
      token
    )}">Confirm</a></span>
</span></div>`
  };
  return emailRepository.send(msg);
};

export const sendWelcomeEmail = (email) => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Congratulation with registation",
    html: `
      <div
        style='
          width: 40%;
          margin: 0 auto;
        '  
      >
        <header
          style='
            padding: 10px 5px;
            box-sizing: border-box;
            border-top: 4px solid silver;
            border-bottom: 4px solid silver;
          '
        >
          <a
            href=${process.env.FRONTEND_HOST}
            style='
              display: block;
              text-align: center;
              text-decoration: none;
              color: #000;
            '
          >
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Anime_eye.svg/2000px-Anime_eye.svg.png'
              alt='popcorn-logo'
              style='
                width: 50px;
                height: 50px;
                vertical-align: middle;
              '
            />
            <span
              style='
                margin-left: 5px;
                font-size: 1.5em;
                font-weight: bold;
              '>
            Pop Corn</span>
          </a>
        </header>
        
        <main
          style='
            font-size: 16px;
          '
        >
          <h1
            style='
              color: #000;
              text-align: center;
            '
          >Welcome to Pop Corn!</h1>
          <p
            style='
              font-size: 16px;
              color: #000;
            '
          >
            Please, go to <a href='${process.env.FRONTEND_HOST}'>link</a> for confirm registration.
          </p>

          <p
            style='
              font-size: 16px;
              color: #000;
            '
          >You might be interested in:</p>
          <ul
            style='
              font-size: 16px;
              color: #000;
              cursor: pointer;
            '
          >
            <li><a href='${process.env.FRONTEND_HOST}/tops'>Tops</a></li>
            <li><a href='${process.env.FRONTEND_HOST}/events'>Events</a></li>
            <li><a href='${process.env.FRONTEND_HOST}/surveys'>Surveys</a></li>
          </ul>

          <a
            href='${process.env.FRONTEND_HOST}'
            style='cursor: pointer; text-decoration: none;'>
            <button 
              style='
                display: block;
                margin: 0 auto;
                box-sizing: border-box;
                padding: 10px 20px;  
                border: none;
                border-radius: 4px;
                outline: none;
                background-color: #ff6501;
                text-align: center;
                letter-spacing: 0.4px;
                line-height: 22px;
                font-size: 18px;
                font-weight: 600;
                color: #fff;
              '
            >Let's go</button>
          </a>
        </main>
        
        <footer
          style='
            font-size: 14px;
            color: #000;
          '
        >
          <p>The Pop Corn Team</p>
        </footer>
      </div>
    `
  };
  return emailRepository.send(msg); 
}

