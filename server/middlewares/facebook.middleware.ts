const passport = require('passport');

export const facebookMiddleware = passport.authenticate('facebook', { scope: ["profile","email"], session: false });

export const facebookCallbackMiddleware = passport.authenticate('facebook', {
  failureRedirect: '/login',
  scope: ["profile","email"],
  session: false
});