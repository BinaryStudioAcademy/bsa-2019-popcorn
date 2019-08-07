const jwt = require('jsonwebtoken');
import { secret, expiresIn } from '../config/jwt.config';

export default {
    createToken: data => jwt.sign(data, secret, { expiresIn })
};
