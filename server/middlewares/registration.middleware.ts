const passport = require('passport');

export default passport.authenticate('register', { session: false });