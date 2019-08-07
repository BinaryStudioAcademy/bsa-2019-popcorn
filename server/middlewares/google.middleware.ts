const passport = require('passport');

export const googleMiddleware = passport.authenticate('google', { scope: ["email"], session: false });

export const googleCallbackMiddleware = passport.authenticate('google', {
  failureRedirect: '/login',
  scope: ["email"],
  session: false
});