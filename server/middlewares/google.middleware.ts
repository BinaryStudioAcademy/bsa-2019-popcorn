const passport = require("passport");

export const googleMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false
});

export const googleCallbackMiddleware = passport.authenticate("google", {
  failureRedirect: "/login",
  scope: ["profile", "email"],
  session: false
});
