const passport = require('passport');
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { secret } from './jwt.config';
import * as userService from '../services/user.service';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await userService.getByEmail(email);
            if (!user) {
                return done({ status: 401, message: 'Incorrect email.' }, false);
            }

            return (password === user.password)
                ? done(null, user)
                : done({ status: 401, message: 'Passwords do not match.' }, null, { message: "false"});
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(
    'register',
    new LocalStrategy(
        { passReqToCallback: true },
        async ({ body: { email, aboutMe, location } }, username, password, done) => {
            try {
                const userByEmail = await userService.getByEmail(email);
                if (userByEmail) {
                    return done({ status: 401, message: 'Email is already taken.' }, null);
                }

                return await userService.getByUserName(username)
                    ? done({ status: 401, message: 'Username is already taken.' }, null)
                    : done(null, { email, username, password, aboutMe, location });
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use('jwt', new JwtStrategy(options, async ({ id }, done) => {
    try {
        const user = await userService.getById(id);
        return user ? done(null, user) : done({ status: 401, message: 'Token is invalid.' }, null);
    } catch (err) {
        return done(err);
    }
}));