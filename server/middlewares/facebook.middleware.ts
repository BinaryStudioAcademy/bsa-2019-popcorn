const passport = require('passport');

export const facebookMiddleware = passport.authenticate('facebook', { scope: ["email"], session: false });

export const facebookCallbackMiddleware = passport.authenticate('facebook', {
  failureRedirect: '/login',
  scope: ["email"],
  session: false
});