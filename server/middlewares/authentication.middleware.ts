const passport = require('passport');

export default passport.authenticate('login', { session: false });