const passport = require('passport');
import './../config/passport.config';

export default passport.authenticate('jwt', { session: false });
