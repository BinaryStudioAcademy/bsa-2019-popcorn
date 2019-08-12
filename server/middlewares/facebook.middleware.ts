const passport = require("passport");

export const facebookMiddleware = passport.authenticate("facebook", {
  scope: ["email", "public_profile"],
  session: false
});

export const facebookCallbackMiddleware = passport.authenticate("facebook", {
  failureRedirect: "/login",
  scope: ["email", "public_profile"],
  session: false
});
